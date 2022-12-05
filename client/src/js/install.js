const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
//  Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt=event;
    butInstall.classList.toggle('hidden',false);
});

//  Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if(deferredPrompt!==null){
        deferredPrompt.prompt();
        const {outcome} = await deferredPrompt.userChoice;
        if(outcome==='accepted'){
            deferredPrompt=null;
            butInstall.classList.toggle('hidden',true);
        }
    }
});

//  Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    butInstall.classList.toggle('hidden',true);
    deferredPrompt=null;
});
