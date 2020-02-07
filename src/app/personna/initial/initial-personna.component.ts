import {Component} from "@angular/core";
import {IPersonnaProps} from "../../../components/public_api";


const examplePersonna: IPersonnaProps = {
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

const personnaWithInitials: IPersonnaProps = {
  ...examplePersonna,
  text: 'Maor Sharett',
  initial: 'MS'
};

@Component({
  templateUrl: "initial-personna.component.html",
  selector: "app-initial-personna"
})
export class InitialPersonnaComponent {
  personnas: IPersonnaProps[] = [

    {...examplePersonna, text: "Kat Larrson", size: "size24"},
    {...examplePersonna, text: "Annie", size: "size24"},
    {...examplePersonna, text: "Annie Lind", size: "size32"},
    {...examplePersonna, text: "Annie Boyl Lind", size: "size32"},
    {...examplePersonna, text: "Annie Boyl Carrie Lindqvist", size: "size40"},
    {...examplePersonna, text: "+1 (111) 123-4567 X4567", size: "size40"},
    {...examplePersonna, text: "+1 (555) 123-4567 X4567", size: "size48"},
    {...examplePersonna, text: "宋智洋", size: "size48"},
    {...examplePersonna, text: "남궁 성종", size: "size56"},
    {...examplePersonna, text: "خسرو رحیمی", size: "size56"},
    {...personnaWithInitials, color: "lightBlue", size: "size72"},
    {...personnaWithInitials, color: "magenta", size: "size100"},
    {...personnaWithInitials, color: "teal"}

  ]


}



