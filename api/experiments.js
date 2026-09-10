import { auth, db } from 'hatchable';
export const access = 'public';
export const methods = ['GET','POST'];
export default async function(req,res){
  const user = await auth.getUser(req);
  if(!user) return res.status(401).json({error:'SIGN_IN_REQUIRED'});
  if(req.method==='GET'){
    const {rows}=await db.query('SELECT id, stimulus, response, plasticity, decay, interference, initial_strength, final_strength, recalled, event_type, created_at FROM experiment_runs WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',[user.id]);
    return res.json({runs:rows});
  }
  const b=req.body||{};
  const vals=[user.id,user.email||null,b.stimulus||'RED',b.response||'CIRCLE',Number(b.plasticity)||0,Number(b.decay)||0,Number(b.interference)||0,Number(b.initial_strength)||0,Number(b.final_strength)||0,Boolean(b.recalled),b.event_type||'experiment'];
  const {rows}=await db.query('INSERT INTO experiment_runs (user_id,user_email,stimulus,response,plasticity,decay,interference,initial_strength,final_strength,recalled,event_type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id, created_at',[...vals]);
  return res.json({ok:true,run:rows[0]});
}