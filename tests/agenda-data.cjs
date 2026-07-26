const fs = require("fs");
const vm = require("vm");
const crypto = require("crypto").webcrypto;

const oldDatabase = { version:1, settings:{goals:{}}, tasks:[{id:"old-task",title:"Tarefa antiga",area:"trabalho",subarea:"operacional"}], sessions:[{id:"old-session",startedAt:"2026-07-20T12:00:00.000Z",executedMinutes:30}], preferences:{} };
const storage = new Map([["proxima-acao-db",JSON.stringify(oldDatabase)]]);
const context = { console, crypto, structuredClone, Intl, Date, Math, localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)} };
vm.createContext(context);
["classic/constants.js","classic/models.js","classic/storage.js","classic/agenda.js"].forEach(file=>vm.runInContext(fs.readFileSync(file,"utf8"),context));

const result = vm.runInContext(`(() => {
  const database=loadDatabase();
  ensureAgendaData(database);
  const routineTest=runAgendaTests();
  const afterEnd=blocksForWeek(database,new Date("2026-09-07T12:00:00")).some(block=>block.title==="Fisioterapia");
  const exported=exportDatabase(database);
  const taskWithResponsibility={id:"geld-task",title:"Preparar entrega Geld",responsibilityArea:"geld"};
  const taskWithoutResponsibility={id:"plain-task",title:"Tarefa sem responsabilidade",responsibilityArea:null};
  database.tasks.push(taskWithResponsibility,taskWithoutResponsibility);
  const unplanned={id:"unplanned-session",taskId:taskWithResponsibility.id,taskTitleSnapshot:taskWithResponsibility.title,startedAt:"2026-07-20T14:10:00",executedMinutes:35,result:"concluida",scheduleBlockId:null};
  const ignored={id:"ignored-session",taskId:taskWithoutResponsibility.id,taskTitleSnapshot:taskWithoutResponsibility.title,startedAt:"2026-07-20T15:00:00",executedMinutes:20,result:"concluida",scheduleBlockId:null};
  database.sessions.push(unplanned,ignored);
  const retroactive=recordUnplannedSessionInAgenda(database,unplanned);
  const duplicate=recordUnplannedSessionInAgenda(database,unplanned);
  const notScheduled=recordUnplannedSessionInAgenda(database,ignored);
  saveAgendaBlock(database,{id:"geld-plan",title:"Bloco Geld planejado",responsibilityArea:"geld",blockType:"focus",rigidity:"flexible",date:"2026-07-20",startTime:"14:00",endTime:"15:00",status:"planned",source:"manual"});
  const execution=executionStateForResponsibility(database,"geld",new Date("2026-07-20T12:00:00"));
  database.scheduleBlocks.find(block=>block.title==="Bloco Geld planejado").status="completed";
  const executionAfterBlockCompletion=executionStateForResponsibility(database,"geld",new Date("2026-07-20T12:00:00"));
  return {version:database.version,taskResponsibility:database.tasks[0].responsibilityArea,sessionBlock:database.sessions[0].scheduleBlockId,hasCollections:Array.isArray(database.scheduleBlocks)&&Array.isArray(database.scheduleRecurrences)&&Array.isArray(database.maintenanceRoutines),routineTest,afterEnd,exportedAgenda:Array.isArray(exported.scheduleBlocks)&&!!exported.agendaSettings,retroactive:retroactive&&{source:retroactive.source,area:retroactive.responsibilityArea,status:retroactive.status,start:retroactive.startTime,end:retroactive.endTime,linked:unplanned.scheduleBlockId===retroactive.id},idempotent:duplicate===null&&database.scheduleBlocks.filter(block=>block.sourceSessionId===unplanned.id).length===1,ignored:notScheduled===null&&ignored.scheduleBlockId===null,execution:{status:execution.executionStatus,actual:execution.actualMinutes,outside:execution.unplannedMinutes,expected:execution.expectedMinutes,compliance:execution.compliance},completedBlock:{status:executionAfterBlockCompletion.executionStatus,actual:executionAfterBlockCompletion.actualMinutes,inferred:executionAfterBlockCompletion.completedWithoutSessionMinutes,compliance:executionAfterBlockCompletion.compliance}};
})()`, context);

if(result.version!==2||result.taskResponsibility!==null||result.sessionBlock!==null||!result.hasCollections||!result.routineTest.passed||result.afterEnd||!result.exportedAgenda||result.retroactive?.source!=="unplanned-execution"||result.retroactive?.area!=="geld"||result.retroactive?.status!=="completed"||result.retroactive?.start!=="14:10"||result.retroactive?.end!=="14:45"||!result.retroactive?.linked||!result.idempotent||!result.ignored||result.execution?.status!=="Em execução"||result.execution?.actual!==35||result.execution?.outside!==35||result.execution?.expected!==60||result.execution?.compliance!==0||result.completedBlock?.status!=="Bem executada"||result.completedBlock?.actual!==95||result.completedBlock?.inferred!==60||result.completedBlock?.compliance!==1) throw new Error(JSON.stringify(result));
console.log("agenda-data-ok",JSON.stringify(result));
