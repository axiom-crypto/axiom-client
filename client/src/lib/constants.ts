import { ChainDefaults } from "../types";

// Array.from({ length: 2875 }, () => Math.floor(Math.random() * 256)
//  .toString(16).padStart(2, '0')).join('')
const randomBytes =
  "0xecc9588a978e591220f6598e1a4901c88d3d1803dacc139825ffdd909a1d6db1fc8b568c9ddbba0e524d4615625973b881f746f3934c3d287765b7b395cbd80697857cbdbcdd1c563d1861d69f488e1e9eb852e497a8635da4603969086d8c09b1f1799d086ec87ede1147794fa7cc09298078beed8f4a8318b54b1fd92d0543e1a5f893e96f32c9a0e037281554d4909c279dc5b6a81db22c9302642336b5a63072a931b869af75c1cae79a57350f68dffed2e813609c596b9c9372bf89af15ef90499f7baf307506e0999e519665fcef306be2a084689105e347958503c18f3c2f8d25c3603bdbd395a7e957a4fe836ced9edb9b5b92c3fb7416025b839049a4df7851d7cd0be76b11d791b5bd1e0bf58c284da0d60f7c064a85f6b58d716c23c8485fd2cce945106cf42568b60f32ce29daf888b24769ca9d21e29b05248b061d4658f83f6d88180795572288713d6d4e81561acf226fba668309825299fa9fa2f570bdadef431f5ac503e3df19a3fd32f77806ad1ac47c030f750ecd15a56f3096ec9ac4441daf5b1885cbce3bb5e6876fcca7c968828b5d2eb18b0b5ca9f78ab2e9fcf6c3fdaf02a7529f8f9961b9530bae5f015c2b2eb393a214e2ad986b841fb3a92a41223ae456bac3807f02869972e037c651ce13aa37646531f0bf7810b0941b270e8289cc32daa2007da9d7097ef1c618b3591bac49f5b98ffc7337ce7f6f604a4e69e09325bb7d86e5d6e31390434bfe927ae90ac0ef5ac924841c7b0d7797c25144c13479444f63391aa6836c260d7dd922a9339362ead5fe5606ce9bd70ca003c3c985e87462d7e123bb81fff5a7031cd01305db4c7dab4a4768aac85d19f84d576391a1451c5de987c9c7f18ed9f3ab1e141d1ae5a92b4e1937daeb85ac8e39299f2bd88c240cb37886bf87df50465ba6b89771fe18b8128863de3198b7232a50a81bfd4427b80677f2619e65309413c9f9e5d8b2fb0be32ea9ccd2d41ec5caa5b9f2ba9133f7433a726651e4c828937a84f4ad3a9310ce7e654fc3925a37c375a80de1542d755b5c6c168ef5540d4104a95d89ef6dce4a9d0f997832734ed76a629664699044a80de390820b72467b87062cf37985d984ef9b332095b185faeec55ce8c1d0afe6e081e53958ae145243c4ff70457a64ebc9cbc8410ea2cde6668f15b086a755aa9b573fa3a962a8752a8416bd69cf31800f656cf84c9a74cce95e9d09a3673c5681bf492c021755829d735ae35689d2107a2a7440b772d12dba1131186319155d599064757b554b488ee7a48aa98095299092a29c8ed02ea75a1304585e9a3ea17b0a7cb8094a8da3b4bbeb18e58284b0fb3a67d3588f86719208b7f0ef7ee8d0155e4cb442306a5b1291dc2074c7d1bc764e91a27983b994df1c6dfa37ccc3a69f48c3f69a917c563fd58ca1f5316bb1fb29a64213282fa2117d8ca8c09ba15cafaa081828dad5e121a4fc2381ba7dc15272be260c90798802077e8440b64c5d2db4355eca9193806fc0f8865e2619e22509f1f299b4665d79f03cd77b00804b8ff6c78fd654547395a5c2e209482c94761d237ce6b1103d40386e3902a98c44a264822e3119376deea2464385e0177f12702640555e97ea9133e00c6d481f4149d43bf73f19fd0698fabdc24cd6b4fb2225534cbaafaa6cd786dce9e457a958f91cb0e49a43956e6d268f8f125da375fd05a54af9ce630c9e6c1a9dd107cb20077643d61c9ff9c8e411d04d81e112e7a82321f6e9cfea11d594c8f8653d9bebb1ef4b7068e2580179bd48f44fb64a944755c6414d302f645f04d7d99b6a55e523b7a66177abbf793c5ea5a3174158a026b73a2f1ca16fdf89e94ec197a1ff4da7ed06fa1c41bfc8888629a4c7272bdfdf30e1d3ffd781ab6415266636523b4eee90290183f20b0e4e79719552c940ac87a8b40c6577bed16eb8d3aab77b06d4a0def217e5dd0ef7a421c34720c3715b4dfda5879f86af1c029b698252b9787c4f00fb8c0fb8a57233357d5a3fef7daf7a46488ce28d5b9cefda255489baaafdfe4129cc50f1d3aa351e3aab6baaa41f0c1e93e93b8e22b243c33bb57e2d64b3897e34cdb0d7ea22a8745e58b69663b3990eb6aa4bd322211ec51daf631d1ef14ab20b17dcfae130d75e8211e53923e9f5c6acf6fa4f0f3182eb694bc6dcfa2e6a4a90c61ea46e0ef5796082421900e52af412f3b638f97347c5a0f9630b95d61e510353923ca2e6727c89471beb1391b03644bfd4e59bdbf13da9e2eca029fe3850f1058e3150d08970b0cf5017d92da83f57fb869f67c5d04bbd9335fc87b79047d6ce63c07b2764fc91131785950cc33d4a3ee4d4fa31a910cfae933caef4e251c94c2713908921d138dc8f3b3dda0fe7bc4af48c67118701364eb72284bd08d4e7e326bb287d7653b32eac46590b1c7d4a86378f92ff237ae13da11a0c76287ab905a6ea84d67a21639c471a88c1a62e5effdf7af31d6e0c25791ee3dc1c2985066ec857719723af59464dd4a0fc2c945fc4d1715d11fbd1edaaf07df074388a8ee9654b345d4b1caf0c95482da2764feff3e1fca590efa2f74bc956b804c1f3c354bf7c11fe8f395ea161461412aeac8922be515b1bbc1e524006c533a0f0c94dd19f8f3c9fe8743e8012cb7edaf02da10d9a26434f2154285c79e9e552ddf243b1936a5c446d608190e168531a1cea42689f75f84c2413a29b5c7149a9ccef8b52651fc9bdba4a145f3fb47773523a3c859c0cd70ab63777c5c70cc319a24a4d88f7e21ea48d932307cf5432807b230c16945641dd2390cb0d871112911a585caaf1cb62e3a330c0ec9c775da916af16f8859462f03f9d49ac40d3434ebbb575316a79a01e46c1b384433bdbf7415b0fa96becfe3118c41cae6620c463ebeba3456fffe74ff349b4f05ef347d7aa64261f5b70d79bc73580a2b91c5699fc8b745007304f5131635a7d07e52729abc696d507dd9e762ff333c645bfd313f75db33f363b2f81c6da0ae9518ce9accb4f27f59bc3d1f78316ed6a05f8d4f7fd0f028cd6916e0c26dc7aa56bfb6eed3bdb99ac8f3dc64733582cae3cef6f6792e20faeb8592dc696602369741b9ad3260534ed07eff796644bfcfcdedda840b8a6468a83f7e9a8d4baee567a4975c62ee7210c3e6c8366582a646c4125117a9dd409b89afd9c1e17a05b56b9b54eac5e5609d26f8c87fd68f6d8cdf58c360b18b38f7254c253bf27d7f1beceb7f1ad24094012a2c2a233ae94f366510dd067154631d7b572d22608f778ef3741725efba1a0fcd6e9921631162bde3fc1b2139820673bc117f6e57d125be90efa8a7c92b2f58695508eb7daee92b80d5a39406fc76e2fe2f6e3672cb8f1cc0528be7005f8b9c825c46075adef7a1d6b54728673a933ed9283bfb64a53880cb75c4e5a12186a7b8cdd32df18de5db290a4ce3f75ff05dfa58c4da3b5c69919a6a7d18ac790d22f0930efb9a47344af4085ad820baa2aa16fec9ee256c6200ed8ffcfd1c9a9514490da4c516b0e16cd8e8c3aaba362fd4c57cdc265056615669ef70a62f10b2259389d3ab035a26f83dc44cce3ebad7a08778fdd772b1431d870a7791f4e985fbbc9eb1c65b9047f800c1be7e4d56bc43bf2b21bcd3771942d14beeaac0c72e0c9f1dc96db7082ead8b8afafaed36dd76baced0da99f25f4c81cae210b3135af983c338742eb68fe32fd75a01245a673839be1da31072004fd851ab3d65e4c9f23514b411098190f3f9e455386307791944458397ae39b359a1e3c56e43b243987356a288a755c2133dd587fc1e91aba2354b8f2f862e90a88d650fb2577f6d80378468d31c9dddcd36d03d5609cde0575b55e530d3b8e0ece9256060a9136d791dcd95a77af893fd23da798e4ed0660ce52f5cae3070209c9eb37d6e7277cd6a2647f602330326779d61f89d8779f7e456398afe47144d78041bda4fc2e640f94f03d267bc64644c392440eee251e6bcac1c7ba745e2d0d842ad9a5d2649d2197460de8fe51e3ac840db687651a609839a81f938e6362b230";

export const ClientConstants = Object.freeze({
  AXIOM_PROOF_CALLDATA_LEN: 2875, // bytes
  // Uses a series of random bytes to be pessimistic on compression
  AXIOM_PROOF_CALLDATA_BYTES: randomBytes,
  L1_FEE_NUMERATOR: 120n, // (1.2x multiplier)
  L1_FEE_DENOMINATOR: 100n,
});

export const MainnetDefaults: Readonly<ChainDefaults> = Object.freeze({
  maxFeePerGasWei: 25000000000n,
  minMaxFeePerGasWei: 5000000000n,
  callbackGasLimit: 100000n,
  proofVerificationGas: 420000n,
  axiomQueryFeeWei: 3000000000000000n,
});

export const BaseDefaults: Readonly<ChainDefaults> = Object.freeze({
  maxFeePerGasWei: 750000000n,
  minMaxFeePerGasWei: 250000000n,
  callbackGasLimit: 100000n,
  proofVerificationGas: 420000n,
  axiomQueryFeeWei: 3000000000000000n,
});
