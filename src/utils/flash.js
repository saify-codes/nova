
export class Message{
    static flash(name, message){
        const obj = {message, flash:true}
        sessionStorage.setItem(name, JSON.stringify(obj))

    }
    static set(name, message){
        const obj = {message}
        sessionStorage.setItem(name, JSON.stringify(obj))
    }
    static get(name){
        const obj = sessionStorage.getItem(name)
        if(obj){
            const {message, flash} = JSON.parse(obj)
            if(flash) 
                sessionStorage.removeItem(name)
                setTimeout(() => {
                }, 0);
            return message
        }
    }
    static has(name){
        return !!sessionStorage.getItem(name)
    }
}