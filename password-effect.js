(function(){
    let randomiseSpeed = 100;
    let clearSpeed = 1500; 
    const passwords = Array.from(document.getElementsByClassName("password-generator-effect"));
    createEffect(passwords);


    function createEffect(elements, options = {}){
        if (options.hasOwnProperty('clearSpeed'))
            clearSpeed = options['clearSpeed']

        if (options.hasOwnProperty('randomiseSpeed'))
            randomiseSpeed = options['randomiseSpeed']

        elements.forEach(element => {
            let password = element.textContent.trim();
            const finalString = password;
            let domString = "";
            for(let i=0; i<password.length; i++){
                domString += getRandomUnicode();
            }
            for(let i=0; i<password.length; i++){
    
                let intervalChar = setInterval(() => {
                        domString = domString.replaceAt(i, getRandomUnicode());
                        element.textContent = domString;               
                }, Math.random()*randomiseSpeed + randomiseSpeed);
         
                setTimeout(() => {
                    clearInterval(intervalChar);
                    domString = domString.replaceAt(i, finalString.charAt(i));
                    element.textContent = domString;
                }, clearSpeed * i / password.length);
    
            }
            element.textContent = domString;
        });
    }

    function getRandomUnicode(){
        return String.fromCharCode(64 + Math.random() * (90-64));
    }

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    // one element
    Element.prototype.passwordGeneratorEffect = function(opt = {}){
        arr = [this];
        createEffect(arr, opt);
    }

    // collection of elements
    Array.prototype.passwordGeneratorEffect = function(opt = {}){
        createEffect(this, opt);
    }
    
})();
