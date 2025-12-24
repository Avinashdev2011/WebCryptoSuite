function showToast(msg, type='info') {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    let color = 'border-cyber-cyan text-white';
    if(type=='error') color = 'border-cyber-red text-red-200';
    if(type=='success') color = 'border-cyber-green text-green-200';
    if(type=='pink') color = 'border-cyber-pink text-pink-200';
    t.className = `bg-cyber-panel border-l-4 ${color} p-3 rounded shadow-lg text-xs font-mono fade-in pointer-events-auto`;
    t.innerHTML = `<span class="font-bold">>></span> ${msg}`;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; setTimeout(()=>t.remove(),300); }, 3000);
}

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    const active = document.getElementById(id);
    active.classList.remove('hidden');
    active.classList.remove('fade-in'); void active.offsetWidth; active.classList.add('fade-in');
    
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-white/5'); el.style.borderLeftColor='transparent';
        el.querySelector('span').classList.remove('text-white');
        el.querySelector('i').className = el.querySelector('i').className.replace(/text-cyber-\w+/,'text-gray-500');
    });
    const btn = document.getElementById('nav-'+id);
    btn.classList.add('bg-white/5');
    btn.querySelector('span').classList.add('text-white');
    
    let c='text-cyber-cyan';
    if(id=='pass') c='text-cyber-purple'; if(id=='sym') c='text-cyber-orange'; if(id=='asym') c='text-cyber-green'; if(id=='detect') c='text-cyber-pink'; if(id=='manual') c='text-gray-400';
    
    btn.style.borderLeftColor = id === 'manual' ? '#888' : getComputedStyle(document.documentElement).getPropertyValue(`--${c.replace('text-','')}`);
    if(id=='hash') btn.style.borderLeftColor='#00f0ff'; if(id=='pass') btn.style.borderLeftColor='#bd00ff';
    if(id=='sym') btn.style.borderLeftColor='#ff9d00'; if(id=='asym') btn.style.borderLeftColor='#0aff0a';
    if(id=='detect') btn.style.borderLeftColor='#ff0099';
    
    btn.querySelector('i').className = `fa-solid ${btn.querySelector('i').className.split(' ')[1]} ${c}`;
    if(window.innerWidth < 768) toggleSidebar();
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('-translate-x-full'); document.getElementById('mobileOverlay').classList.toggle('hidden'); }
function setStatus(id, msg, type) { const el=document.getElementById(id); el.className='status-box '+(type=='success'?'status-success':'status-error'); el.innerHTML=(type=='success'?'<i class="fa-solid fa-check"></i> ':'<i class="fa-solid fa-xmark"></i> ')+msg; }

function runDetect() {
    const val = document.getElementById('detectInput').value.trim();
    const resPanel = document.getElementById('detectResults');
    if(!val) { resPanel.classList.add('hidden'); return showToast("INPUT EMPTY", 'error'); }
    resPanel.classList.remove('hidden');
    let name="Unknown", conf="Low", note="No pattern detected.", charSet="ASCII";
    const len=val.length;
    const isHex=/^[0-9a-fA-F]+$/.test(val);
    const isBase64=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(val);
    if ((val.startsWith('$2a$') || val.startsWith('$2b$')) && len===60) { name="Bcrypt Hash"; conf="Certain"; charSet="Bcrypt Base64"; note="Standard password format."; }
    else if (isHex) {
        charSet="Hexadecimal";
        if(len===32) { name="MD5 Hash"; conf="High"; note="128-bit weak hash."; }
        else if(len===40) { name="SHA-1 Hash"; conf="High"; note="160-bit deprecated."; }
        else if(len===64) { name="SHA-256 Hash"; conf="High"; note="256-bit standard."; }
        else if(len===128) { name="SHA-512 Hash"; conf="High"; note="512-bit secure."; }
        else { name="Unknown Hex"; conf="Moderate"; note="Non-standard length."; }
    } else if (val.includes("PUBLIC KEY")) { name="PEM Key"; conf="Certain"; charSet="PEM"; note="Cryptographic key."; }
    document.getElementById('resName').innerText=name; document.getElementById('resConf').innerText=conf;
    document.getElementById('resLen').innerText=len+" chars"; document.getElementById('resChar').innerText=charSet; document.getElementById('resNote').innerText=note;
}

function runHash() { const m=document.getElementById('hashInput').value; if(!m) return showToast("INPUT EMPTY",'error'); const a=document.getElementById('hashAlgo').value; document.getElementById('hashOutput').innerText=(a==='SHA256'?CryptoJS.SHA256(m):a==='SHA512'?CryptoJS.SHA512(m):CryptoJS.MD5(m)); showToast("HASHED",'success'); }
function verifyHash() { const i=document.getElementById('hashVerifyInput').value.trim(), c=document.getElementById('hashOutput').innerText.trim(); if(!i) return showToast("PASTE HASH",'error'); if(c==='...'||!c) return showToast("GENERATE FIRST",'error'); if(i.toLowerCase()===c.toLowerCase()) setStatus('hashStatus','MATCH','success'); else setStatus('hashStatus','MISMATCH','error'); }

function runPass() { const p=document.getElementById('passInput').value; if(!p) return showToast("NO PASSWORD",'error'); document.getElementById('passOutput').innerText=dcodeIO.bcrypt.hashSync(p,dcodeIO.bcrypt.genSaltSync(10)); showToast("GENERATED",'success'); }
function verifyPass() { const h=document.getElementById('passVerifyHash').value.trim(), p=document.getElementById('passVerifyInput').value; if(!h||!p) return showToast("FIELDS EMPTY",'error'); try{ if(dcodeIO.bcrypt.compareSync(p,h)) setStatus('passStatus','GRANTED','success'); else setStatus('passStatus','DENIED','error'); }catch(e){ setStatus('passStatus','INVALID HASH','error'); } }

function runEncrypt() { const k=document.getElementById('symEncKey').value, m=document.getElementById('symPlain').value; if(!k||!m) return showToast("MISSING INPUT",'error'); document.getElementById('symCipherOut').innerText=CryptoJS.AES.encrypt(m,k).toString(); showToast("ENCRYPTED",'success'); }
function verifySym() { const k=document.getElementById('symVerifyKey').value, c=document.getElementById('symVerifyCipher').value, e=document.getElementById('symVerifyMsg').value; if(!k||!c) return showToast("MISSING INPUT",'error'); try{ const d=CryptoJS.AES.decrypt(c,k).toString(CryptoJS.enc.Utf8); if(!d) setStatus('symVerifyStatus','BAD KEY','error'); else { if(e && e!==d) setStatus('symVerifyStatus','MISMATCH','error'); else if(e && e===d) setStatus('symVerifyStatus','MATCH','success'); else setStatus('symVerifyStatus','RESULT: '+d,'success'); } }catch{ setStatus('symVerifyStatus','ERROR','error'); } }

let crypt=new JSEncrypt({default_key_size:1024});
function genKeys() { const b=document.getElementById('btnGen'); b.innerText="WAIT..."; b.disabled=true; setTimeout(()=>{crypt.getKey(); document.getElementById('rsaPub').value=crypt.getPublicKey(); document.getElementById('rsaPriv').value=crypt.getPrivateKey(); b.innerText="GENERATE PAIR"; b.disabled=false; showToast("DONE",'success');},100); }
function rsaEncrypt() { const m=document.getElementById('rsaPlain').value, p=document.getElementById('rsaPub').value; if(!m) return showToast("EMPTY",'error'); if(!p) return showToast("NO KEY",'error'); let e=new JSEncrypt(); e.setPublicKey(p); const r=e.encrypt(m); if(r) { document.getElementById('rsaCipher').value=r; showToast("ENCRYPTED",'success'); } else showToast("ERROR",'error'); }
function rsaVerify() { const c=document.getElementById('rsaCipher').value, p=document.getElementById('rsaPriv').value, e=document.getElementById('rsaVerifyMsg').value; if(!c) return showToast("EMPTY",'error'); if(!p) return showToast("NO KEY",'error'); let d=new JSEncrypt(); d.setPrivateKey(p); const r=d.decrypt(c); if(!r) setStatus('rsaStatus','FAILED','error'); else { if(e&&e!==r) setStatus('rsaStatus','MISMATCH','error'); else if(e&&e===r) setStatus('rsaStatus','MATCH','success'); else setStatus('rsaStatus','RESULT: '+r,'success'); } }

switchTab('detect');