import { admin, db } from 'hatchable';
export const access = 'admin';
export const methods = ['GET'];
export default async function(req,res){
  const ok=await admin.check(req);
  if(!ok) return res.status(403).json({error:'ADMIN_ONLY'});
  const {rows}=await db.query(`SELECT user_id, MAX(user_email) AS email, COUNT(*)::int AS experiments, MAX(created_at) AS last_active, ROUND(AVG(final_strength))::int AS avg_strength, SUM(CASE WHEN recalled THEN 1 ELSE 0 END)::int AS successful_recalls FROM experiment_runs GROUP BY user_id ORDER BY last_active DESC`);
  res.json({users:rows});
}