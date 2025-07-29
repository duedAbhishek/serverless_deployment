document.addEventListener("DOMContentLoaded", () => {
  const questionZone = document.getElementById("questionZone");
  const finalMsg = document.getElementById("finalMessage");

  const friendshipQuiz = [
  {
    q: "From when we are friends?",
    opts: ["from childhood", "from primary", "for some years", "from Class 11th"],
    cor: 3,
    reacts: [
      "Awww I thought so 💖",
      "I know you came crying in the class 😜",
      "Batao itne kam samay me bhi hum acche dost ban gaye!",
      "Ahh you hit the right spot 👏 Cheers!!!"
    ]
  },
  {
    q: "Who was the first student one giving viva/explanation of Maths practical in the prayer ground?",
    opts: ["Abhishek", "Faizan", "Devendra", "Neha"],
    cor: 1,
    reacts: [
      "I wished I could go first!",
      "Damn he dodged my questions and you're correct! 🏆",
      "Are mama nahi tha, By the way he had crush on you that time 😂",
      "Naah, you came in middle and asked me not to counter questions 😆"
    ]
  },
  {
    q: "Teacher's day par kiska sir foota tha?",
    opts: ["Pratibha", "Anupam", "Ankit aka Choodi", "Ana"],
    cor: 1,
    reacts: [
      "Naah wo itni activities me kaha engage rhti thi",
      "Haan poor soul, puri eyebrow fat gyi thi fir dressing krni padi thi",
      "Iska nahi footta, cushions hai sir pe😂",
      "Wo bholi bhali si, wo to nahi thi."
    ]
  },
  {
    q: "Sabse Badmosh baccha kaun tha? Offcourse me 😂😂😂. But question is Meri bro bestie(female) kaun thi aur hai.",
    opts: ["Kalpana", "Neha(you)", "Anupam", "Pratibha"],
    cor: 1,
    reacts: [
      "Naah! dost thi but bro bestie nahi",
      "How sharp your memory is, Hip-hip hooray🎉!",
      "Seedhe bacche mujhse door rhte hain, 😂",
      "Naah! wo Sharmati bahut thi. But friend thi ab to bhul gyi hai!"
    ]
  },
  {
    q: "Kaun other class ka student aaya tha, tb class(not you) hooting kar rhi thi?",
    opts: ["Sangeeta", "Jolly", "Ajay", "Preeti"],
    cor: 1,
    reacts: [
      "Hell Naah! tmhare alawa koi nhi tha us time",
      "Yes, bechari sharma gyi thi aur haan me nahi tha us hooting ke piche bas meri eyes thi😂 (Shararti man)",
      "Usko to nasha krwa ke lita diya tha class me",
      "Is bechari ko jarurat hi nahi padi aane ki"
    ]
  }
]; // Keep your original question array here
  const funQuiz = [
  {
    q: "What’s the secret ingredient in your charm?",
    opts: [
      "Glitter from Mars",
      "Smile that rewires brains",
      "Eyes with hidden glitter mode",
      "Wi-Fi strength level confidence"
    ],
    reacts: [
      "Glitter from Mars? Bro, even aliens be simping on your shine.",
      "That smile could restart Windows without pressing CTRL+ALT+DEL 😁",
      "Eyes so sparkly—Google Images wants to feature you.",
      "Your vibe connects hearts faster than 5G ❤️"
    ]
  },
  {
    q: "If you ruled the world for a day, what’s the first law you’d pass?",
    opts: [
      "Mandatory dessert after breakfast",
      "No boring replies allowed",
      "Everyone must compliment her Kajal",
      "“No Math” Day for emotional healing"
    ],
    reacts: [
      "Dessert after breakfast? Ab swarg ki pariyo se kya kam ummed laga skte hain🤭",
      "You're the CEO of 'Why be boring when you're adorable?'",
      "That kajal? Sharp enough to slice through heartbreak. But har roj kaha lagate ho!",
      "'No Math' day? That would be unfair to me!"
    ]
  },
  {
    q: "Your future job title should be?",
    opts: [
      "Official Good Vibes Supplier",
      "Minister of Cuteness",
      "World’s First Meme Therapist",
      "Queen of Chill"
    ],
    reacts: [
      "Wherever you goes, smiles auto-download.",
      "Cuteness ministry never had elections, you were born elected.",
      "Your memes are cheaper than therapy and twice as healing.",
      "You chill so smooth, even iced coffee’s jealous."
    ]
  },
  {
    q: "Your default reply when someone flirts badly?",
    opts: [
      "Kya tumne fridge ke samne khade hoke rehearse kiya tha?",
      "Nice try, Romeo ke beta version.",
      "That line made my cat(pet) roll her eyes.",
      "Please consult Google before your next attempt."
    ],
    reacts: [
      "Even the fridge froze mid-cool cycle hearing that one.",
      "Romeo beta has officially been downgraded to bug report.",
      "Your cat’s now applying for an acting role in sarcasm.",
      "Google called. It said 'Don’t bring my name into this.'"
    ]
  },
  {
    q: "If you had a magical power, what would you do first?",
    opts: [
      "Teleport to Maldives with your gang",
      "Teleport snacks to her blanket fort",
      "Summon puppies every time you sneeze",
      "Turn bad days into ‘Let’s chill with bestie’ days"
    ],
    reacts: [
      "Maldives got nervous—too much glow coming in one frame. Mujhe mat bhul jana🤭",
      "Snacks + blanket fort = Disney+ and emotional support. You are foody one, Me too 😁",
      "Sneeze → puppy → instant mood fix. Scientists confused(are b## ye kya bawaal h)",
      "She’s secretly a mood-fixer with sparkles included."
    ]
  }
];        // Keep your original fun question array here
  const allSections = [friendshipQuiz, funQuiz];
  const labels = ["Friendship Quiz", "Fun Quiz"];

  const state = {
    section: 0,
    idx: 0,
    selected: null
  };

  function renderQuiz() {
    questionZone.innerHTML = "";
    finalMsg.style.display = "none";

    if (state.section >= allSections.length) {
      finalMsg.innerHTML = `
        🎉 <b>Yay, You Finished!</b><br><br>
        <span style='font-weight:400;'>This journey is as epic as our friendship & memories.<br>
        Now, close your eyes—imagine a big teddy🧸 as a gift!<br>
        Aur next meet pe golgappe treat toh banta hai 😉🍫</span><br><br>
        <button class='nav-btn' onclick='history.back()'>🔙 Go Back</button>
      `;
      finalMsg.style.display = "block";
      return;
    }

    const quizArray = allSections[state.section];
    const qData = quizArray[state.idx];

    // Title
    const title = document.createElement("div");
    title.className = "page-title";
    title.textContent = `${labels[state.section]} (${state.idx + 1}/${quizArray.length})`;

    // Question
    const qtxt = document.createElement("div");
    qtxt.className = "question-txt";
    qtxt.textContent = qData.q;

    // Options
    const optsDiv = document.createElement("div");
    optsDiv.className = "options";
    qData.opts.forEach((op, oi) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = op;
      btn.onclick = () => {
        state.selected = oi;
        renderQuiz();
      };

      // Highlight logic
      if (state.selected !== null) {
        if (state.selected === oi) btn.classList.add("selected");
        if (state.section === 0) {
          if (oi === qData.cor) btn.classList.add("correct");
          else if (state.selected === oi && oi !== qData.cor) btn.classList.add("wrong");
        }
      }

      optsDiv.appendChild(btn);
    });

    // Reaction
    const reaction = document.createElement("div");
    reaction.className = "reaction";
    if (state.selected !== null) {
      let txt = qData.reacts[state.selected];
      if (state.section === 0) {
        txt += state.selected === qData.cor ? " ✅" : " ❌";
      }
      reaction.textContent = txt;
    }

    // Navigation
    const navDiv = document.createElement("div");
    navDiv.className = "nav-zone";

    if (state.idx > 0) {
      const prevBtn = document.createElement("button");
      prevBtn.className = "nav-btn";
      prevBtn.textContent = "⬅️ Previous";
      prevBtn.onclick = () => {
        state.idx--;
        state.selected = null;
        renderQuiz();
      };
      navDiv.appendChild(prevBtn);
    }

    if (state.selected !== null) {
      const nextBtn = document.createElement("button");
      nextBtn.className = "nav-btn";
      nextBtn.textContent = "Next ➡️";
      nextBtn.onclick = () => {
        if (state.idx + 1 < quizArray.length) {
          state.idx++;
        } else {
          state.section++;
          state.idx = 0;
        }
        state.selected = null;
        renderQuiz();
      };
      navDiv.appendChild(nextBtn);
    }

    // Group and show
    const sec = document.createElement("div");
    sec.className = "question-section active";
    sec.append(title, qtxt, optsDiv, reaction, navDiv);
    questionZone.appendChild(sec);
  }

  renderQuiz();
});
