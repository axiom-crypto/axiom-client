for (let i = 0; i < 8; i++) {
  let tx = getTx(9000000, i);
  addToCallback(await tx.r());
}
