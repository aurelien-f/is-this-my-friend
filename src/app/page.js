"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMyFriend, setIsMyFriend] = useState(false);
  const [nameFriendText, setNameFriendText] = useState("");
  const [typeFriendText, setTypeFriendText] = useState("");

  const handleChange = (e) => {
    // Récupère la valeur dans le textArea
    const inputValue = e.target.value;
    setInputValue(inputValue);

    // Création de deux tableaux friendship pour la liste des liens d'amitiée et question pour la question
    const [friendship, question] = inputValue.split("---");

    // Partie pour récupérer le nom dans la question
    const nameFriendRegex = /que(.*?)est/;
    const nameFriendMatch = question.match(nameFriendRegex);
    const nameFriendText = nameFriendMatch
      ? nameFriendMatch[1].replace(/\s/g, "")
      : "";
    setNameFriendText(nameFriendText);

    // Partie pour récupérer le type d'ami (Féminin ou Masculin)
    const typeFriendRegex = /mon(.*?)\?/;
    const typeFriendMatch = question.match(typeFriendRegex);
    const typeFriendText = typeFriendMatch ? typeFriendMatch[1] : "";
    setTypeFriendText(typeFriendText);

    if (question && friendship) {
      // Création Array avec les liens d'amitiée
      const lines = friendship.split("\n");

      // Tableaux qui regroupe mes amis direct
      const primaryFriends = [];
      // Tableaux qui regroupe toutes mes relations transitifs
      const allMyfriend = [];

      // Partie pour récupérer mes amis direct
      lines.forEach((line) => {
        if (
          line.includes("Je suis ami avec") ||
          line.includes("Je suis amie avec")
        ) {
          const friend = line.split("avec ")[1];
          allMyfriend.push(friend);
        } else if (
          line.includes("est amie avec moi") ||
          line.includes("est ami avec moi")
        ) {
          const friend = line.split(" est")[0];
          allMyfriend.push(friend);
        }
      });

      // Partie pour récupérer toutes mes relations transitifs
      let friendAdded = false;

      function processLines() {
        lines.forEach((line) => {
          if (allMyfriend.length > 0) {
            const allMyfriendRegex1 = new RegExp(
              "est (ami|amie) avec (" + allMyfriend.join("|") + ")"
            );
            const allMyfriendRegex2 = new RegExp(
              allMyfriend.join("|") + " est (ami|amie) avec"
            );

            if (allMyfriendRegex1.test(line)) {
              const friendWithMyFriend1 = line.split(" est")[0];
              if (!allMyfriend.includes(friendWithMyFriend1)) {
                allMyfriend.push(friendWithMyFriend1);
                friendAdded = true;
                return;
              }
            }
            if (allMyfriendRegex2.test(line)) {
              const friendWithMyFriend2 = line.split("avec ")[1];
              if (!allMyfriend.includes(friendWithMyFriend2)) {
                allMyfriend.push(friendWithMyFriend2);
                friendAdded = true;
                return;
              }
            }
          }
        });

        if (friendAdded) {
          friendAdded = false;
          processLines();
        }
      }

      processLines();

      // Partie affichage de la réponse
      const isMyFriend =
        primaryFriends.includes(nameFriendText) ||
        allMyfriend.includes(nameFriendText);
      setIsMyFriend(isMyFriend);
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <h2 className="h2">L&apos;ami de mon ami est mon ami</h2>
        <div>
          <textarea type="text" value={inputValue} onChange={handleChange} />
          <p className="bold">Réponse :</p>
          <p>
            {nameFriendText === "" || typeFriendText === ""
              ? ""
              : isMyFriend
              ? `Oui, ${nameFriendText} est ton ${typeFriendText}`
              : `Non, ${nameFriendText} n'est pas ton ${typeFriendText}`}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
