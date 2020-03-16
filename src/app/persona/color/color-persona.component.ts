import {Component} from "@angular/core";
import {IPersonaProps} from "../../../components/persona/persona-props";

const sharedPersonaProps: IPersonaProps = {
  size: "size100"
};

@Component({
  templateUrl: "color-persona.component.html",
  selector: "app-color-persona",
  styles: [".persona-item {margin-top: 20px}"]
})
export class ColorPersonaComponent {
  personas: IPersonaProps[] = [
    {
      color: "green", ...sharedPersonaProps, text: "green10",
      imageAlt: "Green circle with the letter G in white text at the center"
    },
    {
      color: "darkGreen", ...sharedPersonaProps, text: "darkGreen20",
      imageAlt: "Dark green circle with the letter D in white text at the center"
    },
    {
      color: "teal", ...sharedPersonaProps, text: "teal10",
      imageAlt: "Teal circle with the letter T in white text at the center"
    },
    {
      color: "cyan", ...sharedPersonaProps, text: "cyan30",
      imageAlt: "Cyan circle with the letter C in white text at the center"
    },
    {
      color: "lightBlue", ...sharedPersonaProps, text: "lightBlue30",
      imageAlt: "Light blue circle with the letter L in white text at the center"
    },
    {
      color: "blue", ...sharedPersonaProps, text: "blue20",
      imageAlt: "Blue circle with the letter B in white text at the center"
    },
    {
      color: "darkBlue", ...sharedPersonaProps, text: "darkBlue10",
      imageAlt: "Dark blue circle with the letter D in white text at the center"
    },
    {
      color: "violet", ...sharedPersonaProps, text: "violet10",
      imageAlt: "Violet circle with the letter V in white text at the center"
    },
    {
      color: "purple", ...sharedPersonaProps, text: "purple10",
      imageAlt: "Purple circle with the letter P in white text at the center"
    },
    {
      color: "magenta", ...sharedPersonaProps, text: "magenta10",
      imageAlt: "Magenta circle with the letter M in white text at the center"
    },
    {
      color: "lightPink", ...sharedPersonaProps, text: "lightPink10",
      imageAlt: "Light pink circle with the letter L in white text at the center"
    },
    {
      color: "pink", ...sharedPersonaProps, text: "pink10",
      imageAlt: "Pink circle with the letter P in white text at the center"
    },
    {
      color: "burgundy", ...sharedPersonaProps, text: "pinkRed10",
      imageAlt: "Pink red (burgundy) circle with the letter P in white text at the center"
    },
    {
      color: "lightRed", ...sharedPersonaProps, text: "red10",
      imageAlt: "Red circle with the letter R in white text at the center"
    },
    {
      color: "darkRed", ...sharedPersonaProps, text: "darkRed20",
      imageAlt: "Dark red circle with the letter D in white text at the center"
    },
    {
      color: "orange", ...sharedPersonaProps, text: "orange10",
      imageAlt: "Orange circle with the letter O in white text at the center"
    },
    {
      color: "rust", ...sharedPersonaProps, text: "orange30",
      imageAlt: "Rusty orange circle with the letter O in white text at the center"
    },
    {
      color: "gold", ...sharedPersonaProps, text: "orangeYellow20",
      imageAlt: "Orange yellow circle with the letter O in white text at the center"
    },
    {
      color: "warmGray", ...sharedPersonaProps, text: "gray30",
      imageAlt: "Warm gray circle with the letter G in white text at the center"
    },
    {
      color: "coolGray", ...sharedPersonaProps, text: "gray20",
      imageAlt: "Cool gray circle with the letter G in white text at the center"
    },
  ]
}