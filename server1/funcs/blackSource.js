

function blackListedSourceUrl(url){
    const black_prefixes=["https://www.recaptcha","https://www.google.com/"]

    for(x in black_prefixes)
        if(url.startsWith(x))
            return false;

    return true;
}

module.exports=blackListedSourceUrl