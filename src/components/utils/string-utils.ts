export class Strings {
    public static lowerFirst(s: string) {
        if(!s){
            return '';
        }
        if (typeof s !== 'string') {
            return '';
        }

        if(s.length == 1){
            s.charAt(0).toLowerCase();
        }
        return s.charAt(0).toLowerCase() + s.slice(1)
    }

    public static upperFirst(s: string) {
        if(!s){
            return '';
        }
        if (typeof s !== 'string') {
            return '';
        }

        if(s.length == 1){
            s.charAt(0).toUpperCase();
        }
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}