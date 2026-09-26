export function normalize(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toUpperCase().replace(/[^A-Z]/g,'');}
const raw={
  "vi": [
    {
      "answer": "TRÂN CHÂU CẢNG",
      "keyIndex": 5,
      "tag": "Thái Bình Dương",
      "clue": "Ngày 7/12/1941, Nhật Bản tấn công căn cứ hải quân nào của Hoa Kỳ ở Hawaii?",
      "hint": "Tên tiếng Việt gồm ba từ. Trong đó, hai từ đầu có nghĩa là ngọc trai.",
      "explanation": "Cuộc tấn công Trân Châu Cảng ngày 7/12/1941 dẫn tới việc Hoa Kỳ tham chiến trong Thế chiến II.",
      "source": "https://www.nps.gov/perl/",
      "sourceName": "Cục Công viên Quốc gia Hoa Kỳ",
      "id": 0,
      "normalized": "TRANCHAUCANG",
      "start": 1,
      "year": 1941,
      "date": "07.12.1941"
    },
    {
      "answer": "ĐỒNG MINH",
      "keyIndex": 1,
      "tag": "Các bên tham chiến",
      "clue": "Anh, Hoa Kỳ và Liên Xô cùng thuộc phe nào chống lại phe Trục trong Thế chiến II?",
      "hint": "Hai từ chỉ những bên liên kết, cùng chiến đấu vì mục tiêu chung.",
      "explanation": "Anh, Hoa Kỳ và Liên Xô là ba cường quốc chủ chốt của phe Đồng minh. Phe này chống lại phe Trục gồm Đức, Ý, Nhật Bản và các nước liên kết.",
      "source": "https://encyclopedia.ushmm.org/content/en/article/axis-powers-in-world-war-ii",
      "sourceName": "Bảo tàng Tưởng niệm nạn diệt chủng Do Thái Hoa Kỳ",
      "id": 1,
      "normalized": "DONGMINH",
      "start": 5,
      "year": 1942,
      "date": "1939–1945"
    },
    {
      "answer": "BA LAN",
      "keyIndex": 3,
      "tag": "Chiến tranh bùng nổ",
      "clue": "Ngày 1/9/1939, Đức tấn công quốc gia nào, mở đầu Thế chiến II tại châu Âu?",
      "hint": "Một quốc gia ở châu Âu có thủ đô là Warszawa.",
      "explanation": "Đức xâm lược Ba Lan ngày 1/9/1939. Hai ngày sau, Anh và Pháp tuyên chiến với Đức.",
      "source": "https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1939-1941/britain-and-france-declare-war",
      "sourceName": "Bảo tàng Tưởng niệm nạn diệt chủng Do Thái Hoa Kỳ",
      "id": 2,
      "normalized": "BALAN",
      "start": 3,
      "year": 1939,
      "date": "01.09.1939"
    },
    {
      "answer": "NHẬT BẢN",
      "keyIndex": 4,
      "tag": "Chiến tranh kết thúc",
      "clue": "Quốc gia nào ký văn kiện đầu hàng Đồng minh trên chiến hạm Missouri ngày 2/9/1945?",
      "hint": "Quốc gia này còn được gọi là xứ sở mặt trời mọc.",
      "explanation": "Ngày 2/9/1945, Nhật Bản ký văn kiện đầu hàng trên chiến hạm Missouri ở vịnh Tokyo, chính thức kết thúc Thế chiến II.",
      "source": "https://www.archives.gov/college-park/highlights/japanese-surrender",
      "sourceName": "Cơ quan Lưu trữ Quốc gia Hoa Kỳ",
      "id": 3,
      "normalized": "NHATBAN",
      "start": 2,
      "year": 1945,
      "date": "02.09.1945"
    },
    {
      "answer": "LIÊN XÔ",
      "keyIndex": 1,
      "tag": "Mặt trận phía Đông",
      "clue": "Ngày 22/6/1941, Đức mở chiến dịch Barbarossa để xâm lược quốc gia nào?",
      "hint": "Tên gọi ngắn gồm hai từ; quốc gia này có thủ đô là Moskva.",
      "explanation": "Đức tấn công Liên Xô ngày 22/6/1941 trong chiến dịch Barbarossa, mở một mặt trận rộng lớn ở phía Đông.",
      "source": "https://www.nationalww2museum.org/war/articles/hitlers-declaration-war-united-states",
      "sourceName": "Bảo tàng Quốc gia về Thế chiến II",
      "id": 4,
      "normalized": "LIENXO",
      "start": 5,
      "year": 1941,
      "date": "22.06.1941"
    },
    {
      "answer": "ANH",
      "keyIndex": 1,
      "tag": "Châu Âu năm 1939",
      "clue": "Quốc gia nào cùng Pháp tuyên chiến với Đức ngày 3/9/1939? Điền tên gọi ngắn gồm 3 chữ cái.",
      "hint": "Quốc gia có thủ đô là Luân Đôn.",
      "explanation": "Anh và Pháp tuyên chiến với Đức ngày 3/9/1939 sau cuộc xâm lược Ba Lan. Đây là bước mở rộng chiến tranh tại châu Âu.",
      "source": "https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1939-1941/britain-and-france-declare-war",
      "sourceName": "Bảo tàng Tưởng niệm nạn diệt chủng Do Thái Hoa Kỳ",
      "id": 5,
      "normalized": "ANH",
      "start": 5,
      "year": 1939,
      "date": "03.09.1939"
    },
    {
      "answer": "HIROSHIMA",
      "keyIndex": 5,
      "tag": "Những mất mát",
      "clue": "Thành phố nào của Nhật Bản bị Hoa Kỳ ném bom nguyên tử ngày 6/8/1945? Dùng cách viết quốc tế gồm 9 chữ cái.",
      "aliases": [
        "HIROSIMA"
      ],
      "hint": "Tên thành phố bắt đầu bằng H. Đừng nhầm với Nagasaki.",
      "explanation": "Hiroshima bị ném bom nguyên tử ngày 6/8/1945. Nagasaki bị ném bom ba ngày sau. Hai sự kiện để lại những hậu quả nhân đạo đặc biệt nghiêm trọng.",
      "source": "https://www.nps.gov/wwii/learn/historyculture/august-1945.htm",
      "sourceName": "Cục Công viên Quốc gia Hoa Kỳ",
      "id": 6,
      "normalized": "HIROSHIMA",
      "start": 1,
      "year": 1945,
      "date": "06.08.1945"
    }
  ],
  "en": [
    {
      "answer": "FRANCE",
      "keyIndex": 0,
      "year": 1939,
      "date": "03.09.1939",
      "tag": "War in Europe",
      "clue": "Which country joined Britain in declaring war on Germany on 3 September 1939?",
      "hint": "Its capital is Paris.",
      "explanation": "Britain and France declared war on Germany on 3 September 1939, two days after Germany invaded Poland.",
      "source": "https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1939-1941/britain-and-france-declare-war",
      "sourceName": "United States Holocaust Memorial Museum"
    },
    {
      "answer": "PEARL HARBOR",
      "aliases": [
        "PEARL HARBOUR"
      ],
      "keyIndex": 3,
      "year": 1941,
      "date": "07.12.1941",
      "tag": "The Pacific",
      "clue": "Which US naval base in Hawaii did Japan attack on 7 December 1941?",
      "hint": "Its name pairs a precious gem with a sheltered place for ships. Use the American spelling.",
      "explanation": "The attack on Pearl Harbor on 7 December 1941 led to the United States entering World War II.",
      "source": "https://www.nps.gov/perl/",
      "sourceName": "US National Park Service"
    },
    {
      "answer": "SOVIET UNION",
      "aliases": [
        "USSR"
      ],
      "keyIndex": 4,
      "year": 1941,
      "date": "22.06.1941",
      "tag": "The Eastern Front",
      "clue": "Which country did Germany invade in Operation Barbarossa on 22 June 1941? Write its two-word name.",
      "hint": "Its capital was Moscow.",
      "explanation": "Germany invaded the Soviet Union on 22 June 1941 in Operation Barbarossa, opening a vast front in the east.",
      "source": "https://www.nationalww2museum.org/war/articles/hitlers-declaration-war-united-states",
      "sourceName": "The National WWII Museum"
    },
    {
      "answer": "ALLIES",
      "keyIndex": 4,
      "year": 1942,
      "date": "1939–1945",
      "tag": "The opposing sides",
      "clue": "What collective name is given to the side that included Britain, the United States and the Soviet Union?",
      "hint": "The six-letter plural refers to countries fighting together.",
      "explanation": "Britain, the United States and the Soviet Union were major Allied powers. They fought the Axis powers, including Germany, Italy and Japan.",
      "source": "https://encyclopedia.ushmm.org/content/en/article/axis-powers-in-world-war-ii",
      "sourceName": "United States Holocaust Memorial Museum"
    },
    {
      "answer": "POLAND",
      "keyIndex": 5,
      "year": 1939,
      "date": "01.09.1939",
      "tag": "The outbreak of war",
      "clue": "Which country did Germany invade on 1 September 1939, starting World War II in Europe?",
      "hint": "Its capital is Warsaw.",
      "explanation": "Germany invaded Poland on 1 September 1939. Britain and France declared war on Germany two days later.",
      "source": "https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1939-1941/britain-and-france-declare-war",
      "sourceName": "United States Holocaust Memorial Museum"
    },
    {
      "answer": "HIROSHIMA",
      "keyIndex": 3,
      "year": 1945,
      "date": "06.08.1945",
      "tag": "The human cost",
      "clue": "Which Japanese city was hit by an atomic bomb on 6 August 1945?",
      "hint": "Its name starts with H. Nagasaki was bombed three days later.",
      "explanation": "Hiroshima was bombed on 6 August 1945, followed by Nagasaki on 9 August. Both bombings had devastating humanitarian consequences.",
      "source": "https://www.nps.gov/wwii/learn/historyculture/august-1945.htm",
      "sourceName": "US National Park Service"
    },
    {
      "answer": "GERMANY",
      "keyIndex": 3,
      "year": 1939,
      "date": "01.09.1939",
      "tag": "Europe in 1939",
      "clue": "Which country invaded Poland on 1 September 1939?",
      "hint": "Its capital is Berlin.",
      "explanation": "Germany’s invasion of Poland triggered declarations of war by Britain and France and the start of World War II in Europe.",
      "source": "https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1939-1941/britain-and-france-declare-war",
      "sourceName": "United States Holocaust Memorial Museum"
    }
  ]
};
export const puzzles=Object.fromEntries(Object.entries(raw).map(([lang,rows])=>{
 const keyColumn=6;
 const questions=rows.map((q,id)=>({...q,id,normalized:normalize(q.answer),start:keyColumn-q.keyIndex}));
 return [lang,{questions,keyColumn,columns:Math.max(...questions.map(q=>q.start+q.normalized.length)),keyword:lang==='vi'?'HÒA BÌNH':'FREEDOM'}];
}));
export function newGame(){return {active:0,drafts:Array(7).fill(''),solved:Array(7).fill(false),hints:Array(7).fill(false)};}
export function solve(game,puzzle,index,value){const q=puzzle.questions[index],v=normalize(value);if(v!==q.normalized&&!(q.aliases||[]).some(a=>normalize(a)===v))return false;game.solved[index]=true;game.drafts[index]=q.answer;return true;}
export function nextUnsolved(game){for(let step=1;step<=7;step++){const i=(game.active+step)%7;if(!game.solved[i])return i;}return -1;}
export function unlockedKeyword(game,puzzle){return game.solved.every(Boolean)?puzzle.questions.map(q=>q.normalized[q.keyIndex]).join(''):null;}
