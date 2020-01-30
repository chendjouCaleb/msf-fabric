import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IconRegistry} from "./icon-registry";
import {IconProvider} from "./icon-provider";
import {MsfIconFont} from "./icon-font.component";
import {MsfIconImage} from "./icon-image";


let msfProvider = new IconProvider();
msfProvider.className = "ms-Icon";
msfProvider.classPrefix = "ms-Icon--";
msfProvider.mapping.put("plus", "Add");

let mdiProvider = new IconProvider();
mdiProvider.className = "mdi";
mdiProvider.classPrefix = "mdi-";

let iconRegistry = new IconRegistry();
iconRegistry.put("MsIcon", msfProvider);
iconRegistry.put("MdiIcon", mdiProvider);
iconRegistry.defaultProviderName = "MsIcon";

export const MSF_DEFAULT_ICON_REGISTRY = iconRegistry;


@NgModule({
  imports: [CommonModule],
  declarations: [MsfIconFont, MsfIconImage],
  exports: [MsfIconFont, MsfIconImage],
  providers: [
    {provide: IconRegistry, useValue: MSF_DEFAULT_ICON_REGISTRY}
  ]

})
export class MsfIconModule {
}
