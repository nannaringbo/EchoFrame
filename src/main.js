import * as THREE from "three";
import { Score } from "./Score/Score";
import { Score1 } from "./Score/Score1";
import { Score2 } from "./Score/Score2";
import { Score3 } from "./Score/Score3";
import "/src/styles.css";

function main() {
  // Get a reference to the container element
  const container = document.querySelector("#scene-container");

  const button1 = Button({
    text: "Score 1",
    onClick: () => {
      const score = new Score1(container);
      button1.hidden = true;
      button2.hidden = true;
      button3.hidden = true;
    },
  });

  const button2 = Button({
    text: "Score 2",
    onClick: () => {
      const score = new Score2(container);
      button1.hidden = true;
      button2.hidden = true;
      button3.hidden = true;
    },
  });

  const button3 = Button({
    text: "Score 3",
    onClick: () => {
      const score = new Score3(container);
      button1.hidden = true;
      button2.hidden = true;
      button3.hidden = true;
    },
  });

  container.appendChild(button1);
  container.appendChild(button2);
  container.appendChild(button3);
}

main();

function Button({ text, onClick }) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.backgroundColor = "#FAEBD7";
  button.style.padding = "40px 70px";
  button.style.margin = "100px 20px";
  button.style.fontSize = "30px";
  button.style.color = "#6495ED";
  button.style.border = "2px solid #6495ED";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";

  button.addEventListener("click", onClick);

  return button;
}
