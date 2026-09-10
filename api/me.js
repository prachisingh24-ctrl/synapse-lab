import { auth, db } from 'hatchable';
export const access = 'public';
export const methods = ['GET'];
export default async function(req,res){
  const user = await auth.getUser(req);
  if(!user){ return res.json({signedIn:false}); }
  const {rows} = await db.query('SELECT COUNT(*)::int AS runs, COALESCE(MAX(created_at), now()) AS last_run FROM experiment_runs WHERE user_id = $1',[user.id]);
  res.json({signedIn:true,user:{id:user.id,email:user.email,name:user.name||'Memory Engineer',image:user.image||null},stats:rows[0]});
}