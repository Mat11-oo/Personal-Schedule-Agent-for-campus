/* Local PDF and video export: no model code is evaluated. */
(() => {
  'use strict';
  const font='"PingFang SC","Microsoft YaHei",sans-serif';
  function wrap(ctx,text,width) {
    const lines=[];for(const paragraph of String(text).split('\n')){let line='';for(const char of paragraph){if(ctx.measureText(line+char).width>width&&line&&!/[，。！？；：、）】》,.!?;:)]/.test(char)){lines.push(line);line=char;}else line+=char;}lines.push(line);}return lines;
  }
  function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name.replace(/[\\/:*?"<>|]/g,'_');a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);}
  function pdfPages(lesson) {
    const pages=[];let canvas,ctx,y;
    const next=()=>{
      canvas=document.createElement('canvas');canvas.width=1240;canvas.height=1754;ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,1240,1754);
      ctx.fillStyle='#285b48';ctx.font=`600 20px ${font}`;ctx.fillText('学屿 / AI 学堂',92,68);ctx.fillStyle='#748178';ctx.font=`18px ${font}`;ctx.textAlign='right';ctx.fillText('学习讲义 · '+(pages.length+1),1148,68);ctx.textAlign='left';ctx.fillStyle='#e1e7e2';ctx.fillRect(92,90,1056,2);y=150;pages.push(canvas);
    };
    const line=(value,size=25,color='#283a31',weight='400',gap=43)=>{
      ctx.font=`${weight} ${size}px ${font}`;const lines=wrap(ctx,value,1056);
      for(const row of lines){if(y+gap>1625)next();ctx.font=`${weight} ${size}px ${font}`;ctx.fillStyle=color;ctx.fillText(row,92,y);y+=gap;}
    };
    next();line(lesson.title,43,'#234a39','600',62);line(lesson.audience+' · '+lesson.sourceNote,19,'#748178','400',32);y+=34;
    lesson.sections.forEach((section,i)=>{if(y+150>1625)next();line(String(i+1).padStart(2,'0')+'  '+section.title,29,'#285b48','600',49);line(section.body);y+=32;});
    for(const [i,page] of pages.entries()){const c=page.getContext('2d');c.fillStyle='#e1e7e2';c.fillRect(92,1660,1056,2);c.fillStyle='#748178';c.font=`17px ${font}`;c.fillText('教学内容请核对后使用 · 学屿 AI 学堂',92,1698);c.textAlign='right';c.fillText(`${i+1} / ${pages.length}`,1148,1698);}
    return pages;
  }
  function makePDF(pages) {
    const enc=new TextEncoder(),parts=[],offsets=[0];let length=0;
    const append=value=>{const bytes=typeof value==='string'?enc.encode(value):value;parts.push(bytes);length+=bytes.length;};
    const object=(id,body)=>{offsets[id]=length;append(`${id} 0 obj\n`);append(body);append('\nendobj\n');};
    append('%PDF-1.4\n');object(1,'<< /Type /Catalog /Pages 2 0 R >>');
    object(2,`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
    pages.forEach((canvas,i)=>{
      const id=3+i*3,jpeg=Uint8Array.from(atob(canvas.toDataURL('image/jpeg',0.93).split(',')[1]),c=>c.charCodeAt(0));
      object(id,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im${i} ${id+1} 0 R >> >> /Contents ${id+2} 0 R >>`);
      offsets[id+1]=length;append(`${id+1} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);append(jpeg);append('\nendstream\nendobj\n');
      const content=`q 595.28 0 0 841.89 0 0 cm /Im${i} Do Q`;
      object(id+2,`<< /Length ${enc.encode(content).length} >>\nstream\n${content}\nendstream`);
    });
    const start=length,count=3+pages.length*3;append(`xref\n0 ${count}\n0000000000 65535 f \n`);
    for(let i=1;i<count;i++)append(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);
    append(`trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`);return new Blob(parts,{type:'application/pdf'});
  }
  function drawSlide(canvas,slide,{index=0,total=1,progress=0,subtitle=''}={}) {
    const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.fillStyle='#f4f6ef';c.fillRect(0,0,w,h);
    c.fillStyle='#e2ebda';c.beginPath();c.arc(w-40,10,230,0,Math.PI*2);c.fill();c.fillStyle='#285b48';c.font=`600 21px ${font}`;c.fillText('学屿 / AI 学堂',64,55);
    c.fillStyle='#627866';c.font=`19px ${font}`;c.textAlign='right';c.fillText(`${String(index+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`,w-64,55);c.textAlign='left';
    c.fillStyle='#183a2a';c.font=`600 ${slide.title.length>48?32:42}px ${font}`;wrap(c,slide.title,w-128).slice(0,2).forEach((line,i)=>c.fillText(line,64,133+i*50));
    let y=225;const visible=Math.max(1,Math.ceil(progress*slide.bullets.length));
    slide.bullets.forEach((bullet,i)=>{c.globalAlpha=i<visible?1:0.24;c.fillStyle='#285b48';c.beginPath();c.arc(77,y-8,5,0,Math.PI*2);c.fill();c.font=`24px ${font}`;c.fillStyle='#294334';const lines=wrap(c,bullet,w-186).slice(0,2);lines.forEach((line,j)=>c.fillText(line,104,y+j*30));y+=lines.length*30+15;});c.globalAlpha=1;
    if(subtitle){c.fillStyle='#e9eee5';c.fillRect(40,h-103,w-80,65);c.fillStyle='#304b38';c.font=`21px ${font}`;c.textAlign='center';wrap(c,subtitle,w-144).slice(0,2).forEach((line,i)=>c.fillText(line,w/2,h-77+i*27));c.textAlign='left';}
    c.fillStyle='#dce5d6';c.fillRect(0,h-8,w,8);c.fillStyle='#587c45';c.fillRect(0,h-8,w*(index+progress)/total,8);
  }
  async function recordVideo(lesson,{audioBlob,signal,onProgress,silentSeconds=12}={}) {
    if(!window.MediaRecorder||!HTMLCanvasElement.prototype.captureStream)throw new Error('当前浏览器不支持视频导出，请使用较新版本的 Chrome、Edge 或 Safari。');
    const type=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/mp4','video/webm'].find(t=>MediaRecorder.isTypeSupported(t));
    if(!type)throw new Error('当前浏览器没有可用的视频编码器。');
    const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=720;
    let audioContext,source,stream,recorder,timer,frame;const tracks=[];
    try{
      let buffer;
      if(audioBlob){audioContext=new AudioContext();await audioContext.resume();buffer=await audioContext.decodeAudioData(await audioBlob.arrayBuffer());if(buffer.duration>600)throw new Error('录音超过 10 分钟，请使用与微课时长匹配的录音。');}
      if(signal?.aborted)throw new DOMException('已取消','AbortError');
      const weights=lesson.slides.map(s=>Math.max(1,s.narration.length)),sum=weights.reduce((a,b)=>a+b,0);
      const duration=buffer?buffer.duration:lesson.slides.length*silentSeconds;
      const timings=weights.map(w=>buffer?w/sum*duration:silentSeconds),starts=[];let end=0;for(const t of timings){starts.push(end);end+=t;}
      drawSlide(canvas,lesson.slides[0],{total:lesson.slides.length});stream=canvas.captureStream(0);tracks.push(...stream.getTracks());const captureTrack=stream.getVideoTracks()[0];
      if(buffer){const destination=audioContext.createMediaStreamDestination();source=audioContext.createBufferSource();source.buffer=buffer;source.connect(destination);destination.stream.getAudioTracks().forEach(t=>{stream.addTrack(t);tracks.push(t);});}
      const chunks=[];
      return await new Promise((resolve,reject)=>{
        let settled=false;
        const abort=()=>{if(settled)return;settled=true;reject(new DOMException('已取消','AbortError'));if(recorder?.state==='recording')recorder.stop();};
        const cleanup=()=>signal?.removeEventListener('abort',abort);
        recorder=new MediaRecorder(stream,{mimeType:type,videoBitsPerSecond:1800000});
        recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
        recorder.onerror=()=>{cleanup();if(!settled){settled=true;reject(new Error('视频编码失败，请尝试更短的课程。'));}};
        recorder.onstop=()=>{cleanup();if(!settled){settled=true;const blob=new Blob(chunks,{type:type.split(';')[0]});if(!blob.size){reject(new Error('浏览器未输出视频画面，请保持页面在前台后重试。'));return;}resolve({blob,extension:type.includes('mp4')?'mp4':'webm',duration});}};
        signal?.addEventListener('abort',abort,{once:true});recorder.start(1000);source?.start();const start=performance.now();
        const tick=()=>{
          if(settled)return;
          const elapsed=Math.min((performance.now()-start)/1000,duration);let index=starts.findIndex((s,i)=>elapsed>=s&&elapsed<s+timings[i]);if(index<0)index=starts.length-1;
          const progress=Math.min(1,(elapsed-starts[index])/timings[index]);const slide=lesson.slides[index];
          const sentences=slide.narration.match(/[^。！？；]+[。！？；]?/g)||[slide.narration];
          drawSlide(canvas,slide,{index,total:lesson.slides.length,progress,subtitle:sentences[Math.min(sentences.length-1,Math.floor(progress*sentences.length))]});
          captureTrack.requestFrame?.();onProgress?.(Math.floor(elapsed/duration*100));frame=setTimeout(tick,50);
        };
        tick();timer=setTimeout(()=>{if(recorder.state==='recording')recorder.stop();},duration*1000+150);
      });
    }finally{
      clearTimeout(timer);clearTimeout(frame);if(recorder?.state==='recording')recorder.stop();try{source?.stop();}catch{}tracks.forEach(t=>t.stop());await audioContext?.close();
    }
  }
  window.TeachingMedia={wrap,download,pdfPages,makePDF,drawSlide,recordVideo};
})();
