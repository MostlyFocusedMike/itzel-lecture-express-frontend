app.use(cookieParser('secret'))



app.get('/count', function (req, res) {
  console.log(req.signedCookies);

  let count = Number(req.signedCookies.count) || 0;
  count++;

  res.cookie('count', count, {signed: true})
  res.send({ count });
})

const thing = {
  toBe() {
    console.log('to be');
  }
}