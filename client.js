// 鲸鱼快照：DeepSeek Harness 原生 React 管理面板，无 iframe / 独立网页依赖。
// Host 启动时通过 VBS --no-browser 预热后端；面板结构在点击后立即渲染。
window.__ModuleLoader__.load({
  id: 'dsh-snapshot-manager',
  factory(require) {
    const React = require('react')
    const {useState,useEffect,useRef,Fragment} = React
    const h = React.createElement
    let portal = node => node
    try { const d = require('react-dom'); if (typeof d.createPortal === 'function') portal = d.createPortal.bind(d) } catch (_) {}
    const API = 'http://127.0.0.1:8757'
    const CSS = [
      '.whale-button{height:36px;min-width:36px;border:0;background:transparent;color:var(--dsw-alias-label-primary,#edf0f6);border-radius:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;padding:0 9px;-webkit-app-region:no-drag}',
      '.whale-button:hover,.whale-close:hover,.whale-btn:hover:not(:disabled){background:rgba(128,128,128,.19)}',
      '.whale-backdrop{position:fixed;inset:0;z-index:12000;background:rgba(0,0,0,.66);display:flex;align-items:center;justify-content:center;padding:14px;-webkit-app-region:no-drag}',
      '.whale-window{box-sizing:border-box;width:min(960px,100%);height:min(840px,93vh);max-height:93vh;display:flex;flex-direction:column;position:relative;background:var(--dsw-alias-bg-base,#181a20);color:var(--dsw-alias-label-primary,#e8eaf0);border:1px solid rgba(128,128,128,.25);border-radius:13px;box-shadow:0 20px 70px rgba(0,0,0,.5);font-size:13px;overflow:hidden;-webkit-app-region:no-drag}',
      '.whale-head{flex-shrink:0;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 18px;border-bottom:1px solid rgba(128,128,128,.22)}',
      '.whale-title{font-size:17px;font-weight:650;margin:0 0 5px}',
      '.whale-muted{font-size:12px;color:var(--dsw-alias-label-secondary,#99a2b3);line-height:1.6}',
      '.whale-main{overflow:auto;flex:1;min-height:0;padding:16px;display:flex;flex-direction:column;gap:14px}',
      '.whale-card{background:rgba(128,128,128,.055);border:1px solid rgba(128,128,128,.19);border-radius:10px;padding:13px}',
      '.whale-card-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}',
      '.whale-card h3{font-size:14px;font-weight:650;margin:0}',
      '.whale-flex{display:flex;align-items:center;gap:7px;flex-wrap:wrap}',
      '.whale-row{padding:9px 0;border-top:1px solid rgba(128,128,128,.13);display:flex;align-items:flex-start;justify-content:space-between;gap:12px;min-width:0}',
      '.whale-row-body{flex:1;min-width:0}',
      '.whale-row-title{font-size:13px;font-weight:600;margin-bottom:3px}',
      '.whale-path{font-family:Consolas,monospace;word-break:break-all;font-size:11px;color:var(--dsw-alias-label-secondary,#a0a8b9)}',
      '.whale-meta{font-size:11px;color:var(--dsw-alias-label-secondary,#a0a8b9);line-height:1.6;margin-top:3px}',
      '.whale-pill{display:inline-block;border-radius:5px;padding:2px 6px;background:rgba(128,128,128,.16);font-size:11px;margin-left:7px}',
      '.whale-pill.ok{background:rgba(34,170,90,.16);color:#67dda1}',
      '.whale-pill.err{background:rgba(210,65,65,.16);color:#f0a0a0}',
      '.whale-btn{border:1px solid rgba(128,128,128,.25);background:rgba(128,128,128,.11);color:inherit;border-radius:7px;font-size:12px;cursor:pointer;padding:7px 10px;min-height:32px;white-space:nowrap;-webkit-app-region:no-drag}',
      '.whale-btn:disabled{opacity:.43;cursor:not-allowed}',
      '.whale-btn.primary{background:#6279ed;border-color:#6279ed;color:#fff}',
      '.whale-btn.primary:hover:not(:disabled){background:#4c64d7}',
      '.whale-btn.danger{color:#f2a0a0;border-color:rgba(220,70,70,.38)}',
      '.whale-close{border:0;background:transparent;color:inherit;cursor:pointer;border-radius:7px;font-size:20px;padding:4px 9px}',
      '.whale-input{box-sizing:border-box;border-radius:7px;border:1px solid rgba(128,128,128,.3);padding:8px 10px;font-size:12px;background:var(--dsw-alias-bg-base,#181a20);color:inherit;min-width:120px;max-width:100%;outline:none}',
      '.whale-input:focus{border-color:#6279ed}',
      '.whale-banner,.whale-empty{padding:10px 12px;border-radius:7px;background:rgba(91,124,250,.11);line-height:1.6}',
      '.whale-empty{background:rgba(128,128,128,.075);color:var(--dsw-alias-label-secondary,#9ca4b5)}',
      '.whale-bar{height:7px;background:rgba(128,128,128,.23);overflow:hidden;border-radius:7px;margin-top:8px}',
      '.whale-fill{height:100%;background:#6279ed;border-radius:7px;transition:width .25s ease}',
      '.whale-dialog-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.74);display:flex;justify-content:center;align-items:center;padding:15px}',
      '.whale-dialog{box-sizing:border-box;max-height:85%;overflow:auto;background:var(--dsw-alias-bg-base,#22252b);border-radius:10px;border:1px solid rgba(128,128,128,.25);padding:18px;width:min(560px,100%)}',
      '.whale-dialog h3{margin:0 0 12px;font-size:15px}',
      '.whale-field{display:flex;flex-direction:column;gap:5px;margin:10px 0}',
      '.whale-field label{font-size:12px;color:var(--dsw-alias-label-secondary,#a0a8b9)}',
      '.whale-warn{color:#f0a0a0;line-height:1.6}',
      '@media(max-width:650px){.whale-backdrop{padding:3px}.whale-window{height:97vh;max-height:97vh}.whale-main{padding:9px}.whale-head{padding:10px}.whale-row{flex-wrap:wrap}}',
    ].join('\n')

    async function api(path,options={},timeoutMs=8000) {
      const controller=new AbortController()
      const timer=setTimeout(()=>controller.abort(),timeoutMs)
      try {
        const response=await fetch(API+path,{
          method:options.method||'GET',headers:{'Content-Type':'application/json'},
          body:options.body===undefined?undefined:JSON.stringify(options.body),
          signal:controller.signal
        })
        const data=await response.json().catch(()=>({}))
        if(!response.ok||data.ok===false)throw Error(data.error||data.msg||('HTTP '+response.status))
        return data
      } finally {clearTimeout(timer)}
    }
    function camera(color,progress,flash) {
      return h('svg',{viewBox:'0 0 24 24',width:18,height:18,fill:'none',stroke:color||'currentColor',strokeWidth:1.5},
        h('path',{d:'M4 7.5h3l2-2h6l2 2h3a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z'}),
        flash?h('path',{d:'M9 13l2 2 4-4',stroke:'#24cd7a',strokeWidth:2}):
          progress===null?h('circle',{cx:12,cy:13,r:3.2}):
          h('circle',{cx:12,cy:13,r:3.2,strokeWidth:2,stroke:'#6279ed',strokeDasharray:20,strokeDashoffset:20*(1-progress/100)})
      )
    }
    function SnapshotFooterButton({wide}) {
      const [open,setOpen]=useState(false)
      const [state,setState]=useState(null)
      const [progress,setProgress]=useState({active:false,done:0,total:1})
      const [plugin,setPlugin]=useState(null)
      const [offline,setOffline]=useState(false)
      const [working,setWorking]=useState(false)
      const [notice,setNotice]=useState('')
      const [snapName,setSnapName]=useState('')
      const [dialog,setDialog]=useState(null)
      const [config,setConfig]=useState(null)
      const [store,setStore]=useState('')
      const [program,setProgram]=useState('')
      const [addPathValue,setAddPathValue]=useState('')
      const [addLabel,setAddLabel]=useState('')
      const [flash,setFlash]=useState(false)
      const prevProgress=useRef(false)

      async function refresh() {
        const [overview,prog,inst]=await Promise.allSettled([
          api('/api/state',{},7000),
          api('/api/progress',{},3500),
          api('/api/plugin-status',{},3500),
        ])
        if(overview.status==='fulfilled') {setState(overview.value);setOffline(false)}
        else setOffline(true)
        if(prog.status==='fulfilled')setProgress(prog.value)
        if(inst.status==='fulfilled')setPlugin(inst.value)
      }
      useEffect(()=>{
        let alive=true,timer=null
        async function tick() {
          const [overview,prog,inst]=await Promise.allSettled([
            api('/api/state',{},7000),api('/api/progress',{},3500),api('/api/plugin-status',{},3500)
          ])
          if(!alive)return
          if(overview.status==='fulfilled'){setState(overview.value);setOffline(false)}
          else setOffline(true)
          if(prog.status==='fulfilled')setProgress(prog.value)
          if(inst.status==='fulfilled')setPlugin(inst.value)
          timer=setTimeout(tick,open?2400:5500)
        }
        tick()
        return()=>{alive=false;clearTimeout(timer)}
      },[open])
      useEffect(()=>{
        const before=prevProgress.current
        prevProgress.current=!!progress.active
        if(before && !progress.active) {
          setFlash(true);refresh().catch(()=>{})
          const t=setTimeout(()=>setFlash(false),2000)
          return()=>clearTimeout(t)
        }
      },[progress.active])
      useEffect(()=>{
        if(!open)return
        const fn=e=>{if(e.key==='Escape'){if(dialog)setDialog(null);else setOpen(false)}}
        document.addEventListener('keydown',fn)
        return()=>document.removeEventListener('keydown',fn)
      },[open,dialog])

      async function action(msg,task) {
        if(working)return
        setWorking(true);setNotice('')
        try {await task();if(msg)setNotice(msg);await refresh()}
        catch(error){setNotice('操作失败：'+(error.message||String(error)))}
        finally{setWorking(false)}
      }
      function button(title,click,kind='',disabled=false) {
        return h('button',{type:'button',className:'whale-btn'+(kind?' '+kind:''),onClick:click,disabled},title)
      }
      function flex(...children){return h('div',{className:'whale-flex'},...children)}
      function card(title,tools,...children) {
        return h('section',{className:'whale-card'},
          h('div',{className:'whale-card-head'},h('h3',null,title),tools||null),...children)
      }
      function label(t,kind=''){return h('span',{className:'whale-pill'+(kind?' '+kind:'')},t)}
      const activity=state&&state.activity?state.activity:{state:'checking',desc:'检测中…'}
      const canSnap=!offline&&!working&&!progress.active &&
        (activity.state==='idle'||activity.state==='running_idle')
      const pct=progress.active?Math.max(0,Math.min(100,Math.round(100*(progress.done||0)/Math.max(1,progress.total||1)))):null
      const status=offline?'快照服务正在启动或暂不可用':state?activity.desc:'连接快照服务中…'

      async function createSnapshot(){
        if(!canSnap)return
        await action('已提交快照任务',async()=>{
          await api('/api/snapshot',{method:'POST',body:{name:snapName.trim()}})
          setSnapName('')
        })
      }
      async function openFolder(path){
        await action('',()=>api('/api/open-folder',{method:'POST',body:{path}}))
      }
      async function openExternal(){
        await action('',()=>api('/api/open-ui',{method:'POST'}))
      }
      async function toggleLock(s){
        await action('快照锁定状态已更新',()=>api('/api/lock',{method:'POST',body:{name:s.name,locked:!s.locked}}))
      }
      async function inspectRestore(s){
        setDialog({kind:'restore',name:s.name,title:'还原「'+s.label+'」',loading:true})
        try {
          const diff=await api('/api/diff?name='+encodeURIComponent(s.name),{},50000)
          setDialog({kind:'restore',name:s.name,title:'还原「'+s.label+'」',diff})
        }catch(error){
          setDialog({kind:'restore',name:s.name,title:'还原「'+s.label+'」',error:error.message})
        }
      }
      async function confirmDialog(){
        if(!dialog)return
        const d=dialog
        setDialog(null)
        if(d.kind==='restore'){
          await action('已提交还原任务',()=>api('/api/restore',{method:'POST',body:{name:d.name}}))
        }else if(d.kind==='delete'){
          await action('已删除快照',()=>api('/api/delete',{method:'POST',body:{name:d.name}}))
        }else if(d.kind==='uninstall'){
          await action('已提交卸载，请重启 Harness',()=>api('/api/plugin-uninstall',{method:'POST'}))
        }
      }
      async function showSettings() {
        setDialog({kind:'settings',title:'快照管家设置',loading:true})
        try {
          const v=await api('/api/config',{},10000)
          setConfig(v);setStore(v.store_root||'');setProgram(v.program_dir_configured||'')
          setDialog({kind:'settings',title:'快照管家设置'})
        } catch(error) {
          setDialog({kind:'settings',title:'快照管家设置',error:error.message})
        }
      }
      async function saveSettings(){
        await action('设置已保存',async()=>{
          await api('/api/config',{method:'POST',body:{store_root:store,program_dir:program}})
          setDialog(null)
        })
      }
      async function addCustom(){
        if(!addPathValue.trim()){setNotice('请填写目录路径');return}
        await action('已添加依赖目录',async()=>{
          await api('/api/add-path',{method:'POST',body:{path:addPathValue.trim(),label:addLabel.trim()}})
          setConfig(await api('/api/config'));setAddPathValue('');setAddLabel('')
        })
      }
      async function removeCustom(path){
        await action('已移除自定义依赖',async()=>{
          await api('/api/remove-path',{method:'POST',body:{path}})
          setConfig(await api('/api/config'))
        })
      }
      // 运行依赖：每项固定布局即刻出现，大小统计异步填入。
      const paths=state&&Array.isArray(state.paths)?state.paths:[]
      const pathRows=paths.map(p=>h('div',{className:'whale-row',key:p.key},
        h('div',{className:'whale-row-body'},
          h('div',{className:'whale-row-title'},p.label,label(p.exists?'存在':'缺失',p.exists?'ok':'err'),
            p.in_snapshot?label('纳入快照'):null,p.custom?label('自定义'):null),
          h('div',{className:'whale-path'},p.path),
          p.is_link?h('div',{className:'whale-meta'},'软链接 → '+p.real_path):null,
          h('div',{className:'whale-meta'},p.use,'　',p.size_str||'')),
        button('打开',()=>openFolder(p.path),'',working||!p.exists)
      ))
      const registry=state&&Array.isArray(state.registry)?state.registry:[]
      const runDeps=card('运行依赖',flex(
        button('＋ 添加依赖',showSettings,'',working),
        button('刷新',()=>refresh(),'',working)),
        h('div',{className:'whale-muted',style:{marginBottom:10}},'Harness 相关安装目录、配置与软链接。目录大小在后台统计，不阻塞界面。'),
        !state?h('div',{className:'whale-empty'},'正在读取依赖目录…'):
          pathRows.length?pathRows:h('div',{className:'whale-empty'},'暂未发现依赖目录'),
        h('div',{className:'whale-muted',style:{marginTop:10}},'关联注册表：',
          registry.length?registry.map((r,i)=>h('span',{className:'whale-pill',key:i,title:r.hive+'\\'+r.key},r.display)):
            (state?'未检测到相关项':'读取中…'))
      )

      // 已安装插件状态：只是管理状态，不再注册 /snapshot 文字命令。
      const pluginCard=card('Harness 内置插件',button('插件设置',showSettings,'',working),
        flex(
          label(plugin?(plugin.installed?'已安装':'未安装'):'检测中…',plugin&&plugin.installed?'ok':''),
          h('span',{className:'whale-muted'},'通过左下角「鲸鱼快照」直接打开此面板。'),
          plugin&&!plugin.installed?
            button('安装插件',()=>action('已安装，请重启 Harness',()=>api('/api/plugin-install',{method:'POST'})),
              'primary',working||!plugin.profile_initialized):null,
          plugin&&plugin.installed?
            button('卸载插件',()=>setDialog({kind:'uninstall',title:'卸载内置插件？'}),'danger',working):null
        ))

      // 快照列表和完整的恢复/删除/锁定操作留在 Harness 内，不打开网页。
      const snaps=state&&Array.isArray(state.snapshots)?state.snapshots:[]
      const snapRows=snaps.map(s=>h('div',{className:'whale-row',key:s.name},
        h('div',{className:'whale-row-body'},
          h('div',{className:'whale-row-title'},s.label,s.locked?label('已锁定'):null,s.cas?label('增量','ok'):null),
          h('div',{className:'whale-meta'},s.time,' · 还原体量 ',s.size_str,
            s.cas?' · 本次增量 '+s.stored_str:'',s.file_count?' · '+s.file_count+' 个文件':''),
          s.skipped_count?h('div',{className:'whale-meta'},'跳过 '+s.skipped_count+' 个文件'):null),
        flex(
          button('打开',()=>openFolder(s.path),'',working),
          button('还原',()=>inspectRestore(s),'',working||progress.active),
          button(s.locked?'解锁':'锁定',()=>toggleLock(s),'',working),
          button('删除',()=>setDialog({kind:'delete',name:s.name,title:'删除「'+s.label+'」？'}),'danger',
            working||s.locked)
        )
      ))
      const snapTools=flex(
        h('input',{className:'whale-input',type:'text',placeholder:'快照名称（可选）',value:snapName,
          onChange:e=>setSnapName(e.target.value),style:{width:180}}),
        button('＋ 创建快照',createSnapshot,'primary',!canSnap)
      )
      const progressView=progress.active?h('div',{className:'whale-banner',style:{marginBottom:12}},
        flex(
          h('span',null,progress.op==='restore'?'正在还原':'正在备份','：'+(progress.current||'准备中…')),
          h('strong',null,pct+'%'),
          button('取消',()=>action('已请求取消操作',()=>api('/api/cancel',{method:'POST'})),'danger',working)
        ),
        h('div',{className:'whale-bar'},h('div',{className:'whale-fill',style:{width:pct+'%'}}))
      ):null
      const snapshotsCard=card('版本快照管理',snapTools,
        h('div',{className:'whale-muted',style:{marginBottom:9}},'快照路径：',
          state?state.store_root:'读取中…','　·　活动状态：',status),
        progressView,
        !state?h('div',{className:'whale-empty'},'正在读取快照列表…'):
          snapRows.length?snapRows:h('div',{className:'whale-empty'},state.snapshots_loading?'正在读取现有快照…':'尚无快照。可以点击「创建快照」保存当前状态。')
      )

      // 差异对比：确认按钮只在差异读取成功后可用。
      const diff=dialog&&dialog.diff
      const diffLines=diff?[
        ...(diff.paths||[]).filter(x=>x.changed).slice(0,35).map(x=>'路径变化：'+x.label),
        ...(diff.configs||[]).filter(x=>x.status!=='same').slice(0,35).map(x=>'配置变化：'+x.rel),
        ...(diff.new_sessions||[]).slice(0,15).map(x=>'新增对话：'+x),
        (diff.skipped||[]).length?'快照创建时跳过 '+diff.skipped.length+' 个文件':null,
      ].filter(Boolean):[]
      const dialogBody=dialog&&dialog.kind==='settings'?
        (dialog.loading?h('div',{className:'whale-empty'},'读取设置中…'):
         dialog.error?h('div',{className:'whale-warn'},dialog.error):
         h(Fragment,null,
           h('div',{className:'whale-field'},h('label',null,'快照存放路径'),
             h('input',{className:'whale-input',value:store,onChange:e=>setStore(e.target.value)})),
           h('div',{className:'whale-field'},h('label',null,'Harness 安装目录（留空自动识别）'),
             h('input',{className:'whale-input',value:program,onChange:e=>setProgram(e.target.value)})),
           h('div',{className:'whale-field'},h('label',null,'自定义依赖目录'),
             ...(config&&config.custom_paths||[]).map((p,i)=>
               h('div',{className:'whale-flex',key:i},h('span',{className:'whale-path',style:{flex:1}},(p.label||'自定义')+'　'+p.path),
                 button('移除',()=>removeCustom(p.path),'danger',working))),
             flex(
               h('input',{className:'whale-input',placeholder:'目录路径',value:addPathValue,
                 onChange:e=>setAddPathValue(e.target.value),style:{flex:1}}),
               h('input',{className:'whale-input',placeholder:'名称',value:addLabel,
                 onChange:e=>setAddLabel(e.target.value),style:{width:90}}),
               button('添加',addCustom,'',working)
             )
           )
         )
        ):
        dialog&&dialog.kind==='restore'?
          h(Fragment,null,
            h('div',{className:'whale-warn'},'还原会覆盖快照范围内的现有文件，请确认差异并确保没有运行中的任务。'),
            dialog.loading?h('div',{className:'whale-empty'},'正在计算差异…'):
              dialog.error?h('div',{className:'whale-warn'},dialog.error):
                h('div',{style:{maxHeight:260,overflow:'auto',marginTop:10}},
                  h('div',{className:'whale-muted'},diff.summary||'即将还原'),
                  ...diffLines.map((line,i)=>h('div',{className:'whale-meta',key:i},line))
                )
          ):
          dialog&&dialog.kind==='delete'?
            h('div',{className:'whale-warn'},'此操作不可撤销，请确认要删除该快照。'):
          dialog&&dialog.kind==='uninstall'?
            h('div',{className:'whale-warn'},'卸载后将移除 Harness 中的入口，但外部快照管家不会删除。'):null
      const dialogView=dialog?h('div',{className:'whale-dialog-backdrop',onClick:()=>setDialog(null)},
        h('div',{className:'whale-dialog',onClick:e=>e.stopPropagation()},
          h('h3',null,dialog.title),dialogBody,
          h('div',{className:'whale-flex',style:{marginTop:18,justifyContent:'flex-end'}},
            button('取消',()=>setDialog(null)),
            dialog.kind==='settings'?
              button('保存设置',saveSettings,'primary',working||dialog.loading||!!dialog.error):
              button(dialog.kind==='restore'?'确认还原':dialog.kind==='delete'?'确认删除':'确认卸载',
                confirmDialog,dialog.kind==='restore'?'primary':'danger',working||dialog.loading||!!dialog.error)
          )
        )
      ):null

      // 所有三个功能区域总是立即挂载，状态和文件清单再按需更新。
      const panel=open?portal(h('div',{className:'whale-backdrop',onClick:()=>setOpen(false)},
        h('div',{className:'whale-window',onClick:e=>e.stopPropagation(),role:'dialog','aria-modal':true,'aria-label':'鲸鱼快照管家'},
          h('header',{className:'whale-head'},
            h('div',null,h('h2',{className:'whale-title'},'鲸鱼快照 · 快照管家'),
              h('div',{className:'whale-muted'},'Harness 内置面板　·　'+status)),
            flex(
              button('打开独立窗口',openExternal,'',working||offline),
              button('刷新',()=>refresh(),'',working),
              h('button',{type:'button',className:'whale-close','aria-label':'关闭',
                onClick:()=>setOpen(false)},'×')
            )
          ),
          h('main',{className:'whale-main'},
            notice?h('div',{className:'whale-banner',role:'status'},notice,'　',button('关闭',()=>setNotice(''))):null,
            offline?h('div',{className:'whale-banner'},'服务正在启动或重连，请稍后；无需手动执行 VBS。面板已经加载，连接恢复后数据会自动出现。'):null,
            runDeps,pluginCard,snapshotsCard
          ),
          dialogView
        )
      ),document.body):null

      return h(Fragment,null,
        h('button',{type:'button',className:'whale-button','aria-label':'鲸鱼快照',
          title:'鲸鱼快照 · '+status,onClick:()=>setOpen(true)},
          camera(canSnap||pct!==null?'#6279ed':null,pct,flash),
          wide?h('span',null,'鲸鱼快照'):null
        ),panel)
    }
    return {
      inject:['slots'],
      apply(ctx){
        if(!document.getElementById('whale-snapshot-native-style')){
          const style=document.createElement('style')
          style.id='whale-snapshot-native-style'
          style.textContent=CSS
          document.head.appendChild(style)
        }
        ctx.slots.inject('sidebar.footer.action',()=>ctx.slots.register({
          name:'sidebar.footer.action',id:'dsh-snapshot-manager',order:-15,label:'鲸鱼快照'
        },SnapshotFooterButton))
      }
    }
  }
})
