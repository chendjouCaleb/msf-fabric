export class DomUtils {
    public static isChild(parent: HTMLElement, target: HTMLElement){

        while(target && target !== parent){
            target = target.parentElement;
        }

        return target === parent;
    }
}