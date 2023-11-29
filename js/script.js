function refreshPage(){
    window.location.reload()
}

let exit = document.getElementById('exit');
exit.addEventListener("click", function(){
    console.log("exit di klik")
    let keluar = document.getElementById('nama');
    keluar.innerText = 'keluar';
})