
document.querySelectorAll('.nav-link').
forEach(link=>{
    if(link.href===window.location.href){
        link.setAttribute('aria-current','page') ;
        // console.log(link.href,window.location.href)

    }
})
//active link end

  