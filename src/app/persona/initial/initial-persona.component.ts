import {Component} from "@angular/core";
import {IPersonaProps} from "../../../components/public_api";


@Component({
  templateUrl: "initial-persona.component.html",
  selector: "app-initial-persona"
})
export class InitialPersonaComponent {
  personas: IPersonaProps[] = [

    {text: "Kat Larrson", size: "size24", initial: "KL", color: "green"},
    {text: "Annie", size: "size24", initial: "A"},
    {text: "Annie Lind", size: "size32", initial: "AL", color: "green"},
    {text: "Annie Boyl Lind", size: "size32", initial: "AL", color: "pink"},
    {text: "Annie Boyl Carrie Lindqvist", secondaryText: 'Designer', size: "size40", initial: "A", color: "blue"},
    {text: "+1 (111) 123-4567 X4567", secondaryText: 'Designer', size: "size40", color: "pink"},
    {text: "+1 (555) 123-4567 X4567", secondaryText: 'Designer', size: "size48"},
    {text: "宋智洋", secondaryText: 'Designer', size: "size48", color: "gold"},
    {text: "남궁 성종", secondaryText: 'Designer', size: "size56", color: "violet"},
    {text: "خسرو رحیمی", secondaryText: 'Designer', size: "size56"},
    {text: 'Maor Sharett', secondaryText: 'Designer', tertiaryText: 'In a meeting', color: "lightBlue", size: "size72"},
    {
      text: 'Maor Sharett',
      secondaryText: 'Designer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
      color: "violet",
      size: "size100"
    },
    {text: 'Maor Sharett', color: "teal", secondaryText: 'Designer'}

  ]


}



