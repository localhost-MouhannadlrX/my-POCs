const black_prefixes=["https://www.recaptcha","https://www.google.com/"]


function blackListedSinkValue(value){
    for(x in black_prefixes)
        if(url.startsWith(x))
            return false;

    return true;
}

module.exports=blackListedSourceUrl