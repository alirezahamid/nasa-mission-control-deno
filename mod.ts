import { Application } from 'https://deno.land/x/oak@v6.5.0/mod.ts'

const app = new Application()
const PORT = 8000

app.use((ctx) => {
    ctx.response.body = `
    _   _____   _____ ___ 
    / | / /   | / ___//   |
   /  |/ / /| | \__ \/ /| |
  / /|  / ___ |___/ / ___ |
 /_/ |_/_/  |_/____/_/  |_|
             
    Nasa Mission Control                           
    
    `
})

if (import.meta.main) {
  await app.listen({
        port: PORT
    })
}
