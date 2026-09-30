let messageSequence = 0;
export function messageId(){return `message-${Date.now()}-${++messageSequence}`;}
export type Mode = 'F' | 'T';
export type Tone = 'polite' | 'casual';
export interface Preferences { name: string; tone: Tone; mode: Mode; completed: boolean }
export const DEFAULTS: Preferences = { name: '중생', tone: 'casual', mode: 'F', completed: false };
export const STORAGE_KEY = 'pocha.preferences.v1';
export interface Concept { id: string; name: string; hanja: string; short: string; definition: string; easy: string; source: string; url: string }
// Editorial summaries checked against these primary texts; expert review required before live launch.
export const CONCEPTS: Record<string, Concept> = {
 anicca: {id:'anicca',name:'무상',hanja:'無常',short:'지금의 모습은 고정되어 있지 않아요.',definition:'조건에 의해 생겨난 모든 것은 변하며, 영원히 같은 상태로 머무르지 않는다.',easy:'감정과 상황도 여러 조건에 따라 달라집니다. 무상은 모든 일이 저절로 좋아진다는 보장이 아니라, 지금의 상태를 영원한 것으로 단정하지 않는 관점입니다.',source:'법구경 277게 · Access to Insight',url:'https://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.20.budd.html'},
 anatta: {id:'anatta',name:'무아',hanja:'無我',short:'하나의 평가로 나를 고정하지 않기.',definition:'모든 법에는 영원하고 독립적이며 변하지 않는 자아의 실체가 없다.',easy:'몸과 마음을 고정된 하나의 실체로 붙잡지 않는 가르침입니다. 내가 무가치하거나 존재하지 않는다는 뜻은 아닙니다. 한 번의 평가가 나의 전부라고 단정하지 않는 데 응용해 볼 수 있습니다.',source:'법구경 279게 · Access to Insight',url:'https://www.accesstoinsight.org/tipitaka/kn/dhp/dhp.20.budd.html'},
 metta: {id:'metta',name:'자애',hanja:'慈愛',short:'나와 다른 이의 안녕을 바라는 마음.',definition:'모든 존재가 행복하고 평안하기를 바라는, 미움과 적의가 없는 마음이다.',easy:'자애는 잘못을 무조건 참거나 모든 관계를 유지해야 한다는 뜻이 아닙니다. 자신을 포함한 존재의 안녕을 바라면서도 필요한 경계를 세울 수 있습니다.',source:'숫타니파타 1.8 자애경 · Access to Insight',url:'https://www.accesstoinsight.org/tipitaka/kn/snp/snp.1.08.amar.html'},
};
export type Topic = 'work' | 'relationship' | 'comparison' | 'everyday';
export interface Message {id:string;role:'user'|'assistant';text:string;conceptId?:string;topic?:Topic;application?:string;action?:string}
export interface ReceiptData {name:string;date:string;summary:string;concepts:{id:string;application:string}[];actions:string[]}
export const SAMPLES=['열심히 준비한 면접에서 떨어져서 속상해.','친구에게 연락했는데 답장이 없어 신경 쓰여.','친구들과 비교하면 나만 뒤처지는 것 같아.'];
export function validatePreferences(raw:unknown):Preferences {const v=(raw??{}) as Partial<Preferences>;return {name:typeof v.name==='string'?v.name.trim().slice(0,12)||'중생':'중생',tone:v.tone==='polite'?'polite':'casual',mode:v.mode==='T'?'T':'F',completed:v.completed===true};}
export function classify(text:string):Topic {if(/비교|뒤처|뒤쳐|잘난/.test(text))return 'comparison';if(/취업|면접|회사|지원|불합격|떨어|작업|업무|시험|성적/.test(text))return 'work';if(/연락|답장|친구|연애|헤어|관계|가족|상대/.test(text))return 'relationship';return 'everyday';}
export function safetyIssue(text:string):'crisis'|'private'|null {if(/자살|자해|죽고|죽을|죽어|목숨|극단적|살기 싫|살고 싶지|해치|살해|kill myself|suicid|self.harm/i.test(text))return 'crisis';if(/@|01[016789][ -]?\d{3,4}[ -]?\d{4}|\d{6}[ -]?[1-4]\d{6}|진단|우울증|공황|정신과|성폭력|학대/.test(text))return 'private';return null;}
export function greeting(p:Preferences):Message {return {id:'greeting',role:'assistant',text:p.tone==='casual'?`어, ${p.name} 반갑고.\n일단 편하게 앉아. 오늘은 어떤 번뇌를 내려놓고 싶어?\n아래 가상 고민을 골라 시작해 봐.`:`${p.name}님, 어서 오세요.\n오늘은 어떤 번뇌를 내려놓고 싶으신가요?\n아래 가상 고민을 골라 시작해 주세요.`};}
const TOPICS={
 work:{title:'준비한 일의 결과에 대한 속상함',ids:['anicca','anatta','metta'],applications:['이번 결과와 앞으로의 모든 가능성을 같은 것으로 보지 않기.','한 번의 평가를 자신의 전부로 받아들이지 않기.','결과를 돌아보기 전에 애쓴 자신에게도 친절을 건네기.'],actions:['오늘 5분 동안 이번 준비에서 잘한 점 한 가지를 적기.','다음 시도에서 바꿀 수 있는 것 한 가지를 적고 10분만 시작하기.','자기 전에 자신에게 해주고 싶은 다정한 말 한 문장 적기.']},
 relationship:{title:'관계 속 기다림과 걱정',ids:['metta','anicca','anatta'],applications:['상대를 배려하면서 내 마음의 안녕도 함께 살피기.','답장이 없는 현재 상황을 관계의 최종 결론으로 단정하지 않기.','다른 사람의 반응 하나를 내 가치 전체와 동일시하지 않기.'],actions:['지금 10분 동안 알림을 끄고 내 할 일 하나에 집중하기.','상대에게 확인된 사실과 내가 추측한 내용을 한 줄씩 나눠 적기.','필요한 경계나 바라는 점을 차분한 한 문장으로 써보기.']},
 comparison:{title:'남과 비교하며 느낀 조급함',ids:['anatta','metta','anicca'],applications:['남과의 비교에서 붙인 이름으로 나를 고정하지 않기.','친구에게 하듯 자신에게도 다정한 말을 건네기.','지금의 차이가 영원히 고정된 차이라고 단정하지 않기.'],actions:['오늘 남과 비교하지 않고 내가 해낸 일 한 가지 적기.','비교하게 되는 화면을 20분 동안 닫아 두기.','내일 할 수 있는 가장 작은 할 일을 하나 정하고 시간 정하기.']},
 everyday:{title:'일상에서 잠시 내려놓고 싶은 마음',ids:['anicca','metta','anatta'],applications:['지금 느끼는 감정이 영원한 상태라고 단정하지 않기.','잘 정리되지 않는 마음도 다그치지 않고 살피기.','하루의 기분 하나로 자신의 전부를 판단하지 않기.'],actions:['잠깐 멈추고 지금의 감정을 단어 세 개로 적기.','5분 동안 화면을 내려놓고 쉬기.','오늘 내가 조절할 수 있는 작은 일 하나만 정하기.']},
} as const;
export interface CounselorProvider {reply(input:{messages:Message[];preferences:Preferences},signal?:AbortSignal):Promise<Message>;receipt(messages:Message[],preferences:Preferences):ReceiptData}
// Explicitly MOCK. Replace with a same-origin SERVER adapter after privacy and safety gates.
// No client API credentials, network requests, storage, or logs for conversation content.
export const sampleProvider:CounselorProvider={
 async reply({messages,preferences:p},signal){
 const last=messages.filter(m=>m.role==='user').at(-1);if(!last||last.text.length>500||safetyIssue(last.text))throw new Error('가상 고민을 500자 이내로 입력해 주세요.');
 await new Promise<void>((resolve,reject)=>{const t=setTimeout(resolve,650);signal?.addEventListener('abort',()=>{clearTimeout(t);reject(new Error('대화가 종료됐어요.'));},{once:true});});if(signal?.aborted)throw new Error('대화가 종료됐어요.');
 const topic=classify(last.text),data=TOPICS[topic],count=messages.filter(m=>m.role==='assistant'&&m.topic===topic).length,phase=count%3,id=data.ids[phase];
 const excerpt=last.text.length>55?last.text.slice(0,55)+'…':last.text;
 const context=phase===0?`“${excerpt}”라는 마음을 먼저 살펴볼게`:phase===1?`이번에 덧붙인 “${excerpt}”에서, 확인된 사실과 해석을 나눠보면 좋겠어`:`지금까지 이야기한 것 중 “${excerpt}”를 바탕으로 작은 실천 하나만 골라보자`;
 const feeling=topic==='work'?'애쓴 만큼 실망이 크게 느껴질 수 있어':topic==='relationship'?'기다리는 동안 여러 생각이 들어 마음이 바빴겠어':topic==='comparison'?'다른 사람의 속도가 보이면 내 걸음이 작게 느껴질 수 있어':'마음이 복잡할 땐 당장 깔끔한 답을 내리지 않아도 괜찮아';
 const text=p.mode==='F'?(p.tone==='casual'?`${p.name}, ${context}.\n\n${feeling}. ${data.applications[phase]} ${CONCEPTS[id].name}${id==='anicca'?'을':'를'} 지금 상황에 이렇게 적용해 볼 수 있어.\n\n${phase===0?'지금 가장 크게 남아 있는 감정은 어떤 거야?':phase===1?'스스로에게 조금 덜 엄격해진다면 어떤 말을 해줄 수 있을까?':data.actions[phase]+' 이 정도부터 해볼까?'}`:`${p.name}님, “${excerpt}”라는 이야기를 살펴볼게요.\n\n${feeling}요. ${data.applications[phase]} ${CONCEPTS[id].name}${id==='anicca'?'을':'를'} 상황에 적용한 관점이에요.\n\n${phase===0?'지금 가장 크게 남아 있는 감정은 무엇인가요?':phase===1?'친한 친구가 같은 상황이라면 어떤 말을 해주실 건가요?':data.actions[phase]+' 이 정도부터 시작해 보셔도 좋아요.'}`):(p.tone==='casual'?`${p.name}, ${context}.\n\n${data.applications[phase]} 이건 ${CONCEPTS[id].name}${id==='anicca'?'을':'를'} 지금 상황에 적용한 관점이야.\n\n오늘 할 일은 하나만: ${data.actions[phase]}\n${phase===0?'이 중에서 바꿀 수 있는 부분은 무엇일까?':phase===1?'이 행동을 언제 시작하면 좋겠어?':'부담이 크면 시간을 절반으로 줄여도 괜찮아.'}`:`${p.name}님, “${excerpt}”를 기준으로 정리해 볼게요.\n\n${data.applications[phase]} ${CONCEPTS[id].name}${id==='anicca'?'을':'를'} 지금 상황에 적용한 관점이에요.\n\n오늘의 작은 실천: ${data.actions[phase]}\n${phase===0?'지금 바꿀 수 있는 부분부터 골라볼까요?':phase===1?'시작할 시간을 하나 정해볼까요?':'부담이 크면 시간을 절반으로 줄여도 좋아요.'}`);
 return {id:messageId(),role:'assistant',text,conceptId:id,topic,application:data.applications[phase],action:data.actions[phase]};
 },
 receipt(messages,p){const answers=messages.filter(m=>m.role==='assistant'&&m.conceptId);const concepts=Array.from(new Map(answers.map(m=>[m.conceptId!,{id:m.conceptId!,application:m.application!}])).values()).slice(0,3);const topics=Array.from(new Set(answers.map(m=>TOPICS[m.topic!].title)));return {name:p.name,date:new Date().toLocaleDateString('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Seoul'}),summary:topics.join(' · '),concepts,actions:Array.from(new Set(answers.map(m=>m.action!))).slice(0,3)};}
};
