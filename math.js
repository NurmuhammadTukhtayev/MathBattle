const puppeteer = require('puppeteer');
let i=0
let e=0
const point=10
// const url='https://tbot.xyz/math/#eyJ1Ijo5Nzg4MDI5OTcsIm4iOiJOdXJtdWhhbW1hZCBUdWtodGF5ZXYiLCJnIjoiTWF0aEJhdHRsZSIsImNpIjoiOTA3NzY5NjA5NjE1MTM1ODI2OCIsImkiOiJBZ0FBQU5tUkFRQTFXVmM2Vk4yMmtTLS01bmsifTJjMDdhYjk0NDg3ZTRjMDc1NWI1ZTczZTA3ZjM4ZGM2?tgShareScoreUrl=tg%3A%2F%2Fshare_game_score%3Fhash%3D4POpYHHlHxmP5lxY-AUJQoNXgQcS-YJIoZ5Pqul8pup3mg9EXgtMWcOsAij3VGkp'
// const url='https://tbot.xyz/math/#eyJ1Ijo5Nzg4MDI5OTcsIm4iOiJOdXJtdWhhbW1hZCBUdWtodGF5ZXYiLCJnIjoiTWF0aEJhdHRsZSIsImNpIjoiLTM0MTE0MzAwNjc4MzQ5MTk1NjAiLCJpIjoiQWdBQUFJaW9BUUN4NG9XbzZqaFJhY3ZMd2lFIn0yYzdmYTA0MmI2NTIyZTBkMTM1ZTgyOTllZmViZmMxMA==&tgShareScoreUrl=tg%3A%2F%2Fshare_game_score%3Fhash%3DB3h9ibomfU-njEnpVgnIDwIEDOGes7MV3AhY2ILNpYw-MyjK--N7rU6HFu32haiU'
const url='https://tbot.xyz/math/#eyJ1Ijo5Nzg4MDI5OTcsIm4iOiJOdXJtdWhhbW1hZCBUdWtodGF5ZXYiLCJnIjoiTWF0aEJhdHRsZSIsImNpIjoiMTM0ODI5NjMzMjE0NzAxNzk4MyIsImkiOiJBZ0FBQU9hUkFRQTFXVmM2RHE3NnFXbUdEbXcifTJjNGQzZjZjNzQ5ODA3YTQ2MDBjMDhlY2EzN2YwNWM1?tgShareScoreUrl=tg%3A%2F%2Fshare_game_score%3Fhash%3DDymk-cTHexNado0vKWzYyKYRlN3uPUz-AE7i1vJ-eXvHLb2HnbkJozHzlN_gIO5X'
const calculate = (a, b, c) => {
    i++
    a=Number(a)
    b=Number(b)

    console.log(c+"    "+i)
    if(c==='–')
        return a-b;

    if(c==='+')
        return a+b

    if(c==='×')
        return a*b
    if(c==='/')
        return a/b
}

const dec=()=>{
    e++
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log("We are in")
    // other actions...
    await page.evaluate("document.getElementById('button_correct').click()")

    const end =async () => {
        console.log("ending...")
        await page.evaluate("document.getElementById('button_wrong').click()")
        dec()
        if(e<20){
            return end()
        }else finish().then(()=>console.log("HAPPY NEW YEAR"))
    }


    const go = async () => {
        let x = await page.evaluate("document.getElementById('task_x').innerHTML")
        let y = await page.evaluate("document.getElementById('task_y').innerHTML")
        let op = await page.evaluate("document.getElementById('task_op').innerHTML")
        let res = await page.evaluate("document.getElementById('task_res').innerHTML")

        if (calculate(x, y, op) === Number(res)) {
            console.log(x + op + y + "=" + res)
            await page.evaluate('document.getElementById("button_correct").click()')
        } else {
            console.log(x + op + y + "!=" + res)
            await page.evaluate('document.getElementById("button_wrong").click()')
        }

        if(i < point){
            return go()
        }
        if(e<20)
            return end()
    }

    go().catch(error=>{
        console.log(error)
    })
    const finish=async ()=>{
        await browser.close();
    }
})().catch(err=>{
    console.log(err)
});