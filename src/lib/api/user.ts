import clientPromise from '../mongodb';


export interface UserProps {
  /*
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
  followers: number;
  verified: boolean;
  */



  id: string,
  name: string,
  nickname: string,
  userType: string,
  email: string,
  avatar: string,
  regType: string,
  mobile: string,
  telegramId: string,
  gender: string,
  weight: number,
  height: number,
  birthDate: string,
  purpose: string,
  marketingAgree: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  loginedAt: string,
  followers : number,
  emailVerified: boolean,
  bio: string,

  password: string,

  walletAddress: string,

  escrowWalletAddress: string,
  escrowWalletPrivateKey: string,

  tronWalletAddress: string,
  tronWalletPrivateKey: string,

  /*
  aliPay: string,
  wechatPay: string,
  unionPay: string,
  JdPay: string,
  naverPay: string,
  kakaoPay: string,
  */

  /*
  seller: {
    status: string,
    bankInfo: {
      bankName: string,
      accountNumber: string,
      accountHolder: string,
    }
  },
  sellerAliPay: {
    status: string,
    qrcodeImage: string,
  },
  sellerWechatPay: {
    status: string,
    qrcodeImage: string,
  },
  sellerUnionPay: {
    status: string,
    qrcodeImage: string,
  },
  sellerJdPay: {
    status: string,
    qrcodeImage: string,
  },
  sellerNaverPay: {
    status: string,
    qrcodeImage: string,
  },
  sellerKakaoPay: {
    status: string,
    qrcodeImage: string,
  },
  */

}

export interface ResultProps {
  totalCount: number;
  users: UserProps[];
}


export async function insertOne(data: any) {

  //console.log('insertOne data: ' + JSON.stringify(data));

  if (!data.walletAddress || !data.nickname || !data.mobile) {
    return null;
  }


  const client = await clientPromise;
  const collection = client.db('trump').collection('users');

  // check same walletAddress or smae nickname

  const checkUser = await collection.findOne<UserProps>(
    {
      $or: [
        { walletAddress: data.walletAddress },
        { nickname: data.nickname },
      ]
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  ///console.log('checkUser: ' + checkUser);


  if (checkUser) {
    return null;
  }


  const id = Math.floor(Math.random() * 900000) + 100000;


  const result = await collection.insertOne(

    {
      id: id,
      email: data.email,
      nickname: data.nickname,
      mobile: data.mobile,

      walletAddress: data.walletAddress,


      createdAt: new Date().toISOString(),

      settlementAmountOfFee: "0",
    }
  );


  if (result) {
    return {
      id: id,
      email: data.email,
      nickname: data.nickname,
      mobile: data.mobile,
    };
  } else {
    return null;
  }
  

}





export async function insertOneVerified(data: any) {



  ///console.log('insertOneVerified data: ' + JSON.stringify(data));


  if (!data.walletAddress || !data.nickname || !data.userType) {
    return null;
  }



  const client = await clientPromise;
  const collection = client.db('trump').collection('users');

  // check same walletAddress or smae nickname

  const checkUser = await collection.findOne<UserProps>(
    {
      $or: [
        { walletAddress: data.walletAddress },
        { nickname: data.nickname },
      ]
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  ///console.log('checkUser: ' + checkUser);


  if (checkUser) {
    return null;
  }


  const id = Math.floor(Math.random() * 900000) + 100000;


  const result = await collection.insertOne(

    {
      id: id,
      nickname: data.nickname,

      userType: data.userType,
      telegramId: data.telegramId,
      mobile: data.mobile,
      email: data.email,


      walletAddress: data.walletAddress,


      createdAt: new Date().toISOString(),

      settlementAmountOfFee: "0",

      verified: true,
    }
  );


  if (result) {
    return {
      id: id,

      nickname: data.nickname,
      userType: data.userType,
      telegramId: data.telegramId,
      mobile: data.mobile,
      email: data.email,
    };
  } else {
    return null;
  }
  

}



export async function updateOne(data: any) {





  if (!data.walletAddress || !data.nickname) {
    return null;
  }


  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  const checkUser = await collection.findOne<UserProps>(
    
    { nickname: data.nickname }
    
  )
      


  if (checkUser) {
    return null;
  }





  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { nickname: data.nickname } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
    );

    return updated;
  } else {
    return null;
  }

}


export async function updateAvatar(data: any) {
  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.avatar) {
    return null;
  }


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { avatar: data.avatar } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}



export async function updateSellerStatus(data: any) {
  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.sellerStatus || !data.bankName || !data.accountNumber || !data.accountHolder) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    bankInfo: {
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      accountHolder: data.accountHolder,
    }
  };
  


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { seller: seller } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}




export async function updateSellerStatusAliPay(data: any) {

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.sellerStatus || !data.qrcodeImage) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    qrcodeImage: data.qrcodeImage,
  };
  


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { sellerAliPay: seller } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}



export async function updateSellerStatusWechatPay(data: any) {

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.sellerStatus || !data.qrcodeImage) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    qrcodeImage: data.qrcodeImage,
  };
  


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { sellerWechatPay: seller } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}



export async function updateSellerStatusUnionPay(data: any) {

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.sellerStatus || !data.qrcodeImage) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    qrcodeImage: data.qrcodeImage,
  };
  


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { sellerUnionPay: seller } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}



export async function updateSellerStatusJdPay(data: any) {

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.sellerStatus || !data.qrcodeImage) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    qrcodeImage: data.qrcodeImage,
  };
  


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { sellerJdPay: seller } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}



export async function updateSellerStatusNaverPay(data: any) {

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.sellerStatus || !data.qrcodeImage) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    qrcodeImage: data.qrcodeImage,
  };
  


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { sellerNaverPay: seller } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}




export async function updateSellerStatusKakaoPay(data: any) {

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // update and return updated user

  if (!data.walletAddress || !data.sellerStatus || !data.qrcodeImage) {
    return null;
  }

  const seller = {
    status: data.sellerStatus,
    qrcodeImage: data.qrcodeImage,
  };
  


  const result = await collection.updateOne(
    { walletAddress: data.walletAddress },
    { $set: { sellerKakaoPay: seller } }
  );

  if (result) {
    const updated = await collection.findOne<UserProps>(
      { walletAddress: data.walletAddress },
      { projection: { _id: 0, emailVerified: 0 } }
    );

    return updated;
  } else {
    return null;
  }


}






export async function getOneByWalletAddress(
  walletAddress: string,
): Promise<UserProps | null> {

  //console.log('getOneByWalletAddress walletAddress: ' + walletAddress);

  const client = await clientPromise;

  const collection = client.db('trump').collection('users');



  ///console.log('getOneByWalletAddress walletAddress: ' + walletAddress);

  // id is number

  const results = await collection.findOne<UserProps>(
    { walletAddress: walletAddress },
  );


  //console.log('getOneByWalletAddress results: ' + results);

  return results;

}





export async function getAllUsers(
  {
    limit,
    page,
  }: {
    limit: number;
    page: number;
  }
): Promise<any> {


  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null
  // order by nickname asc


  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null},
        verified: true,

        
        

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ nickname: 1 })
    .toArray();


  // user info
  // walletAddress, nickname, mobile, email, tronWalletAddress

  const resultUsers = users.map((user) => {
    return {
      walletAddress: user.walletAddress,
      nickname: user.nickname,
      mobile: user.mobile,
      email: user.email,
      tronWalletAddress: user.tronWalletAddress,
    };
  } );

  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      verified: true,
    }
  );

  return {
    totalCount,
    users: resultUsers,
  };

  
}



export async function getBestSellers(
  {
    limit,
    page,
  }: {
    limit: number;
    page: number;
  }
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        // seller is exist and seller status is 'confirmed'

        seller: { $exists: true },
        

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      seller: { $exists: true },
    }
  );

  return {
    totalCount,
    users,
  };

  
}










export async function getUserWalletPrivateKeyByWalletAddress(
  walletAddress: string,
): Promise<string | null> {

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');

  const results = await collection.findOne<UserProps>(
    { walletAddress },
    { projection: { _id: 0, emailVerified: 0 } }
  ) as any;

  console.log('getUserWalletPrivateKeyByWalletAddress results: ' + results);

  if (results) {
    return results.walletPrivateKey;
  } else {
    return null;
  }

}


export async function getUserByEmail(
  email: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  return await collection.findOne<UserProps>(
    { email },
    { projection: { _id: 0, emailVerified: 0 } }
  );

}


export async function checkUserByEmail(
  email: string,
  password: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  const results = await collection.findOne<UserProps>(
    {
      email,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  ///console.log('getUser results: ' + results);

  if (results) {
    return {
      ...results,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }

}


export async function loginUserByEmail(
  email: string,
  password: string,
): Promise<UserProps | null> {

  console.log('getUser email: ' + email);

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  const results = await collection.findOne<UserProps>(
    {
      email,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );

  if (results) {
    
    // user_login_sesson
    const sessionCollection = client.db('trump').collection('user_login_sessions');
    const sessionResults = await sessionCollection.insertOne({
      id: results.id,
      email: results.email,
      loginedAt: new Date().toISOString(),
    });

    console.log('sessionResults: ' + sessionResults);

    return {
      ...results,
      ...sessionResults,
      ///bioMdx: await getMdxSource(results.bio || placeholderBio)
    }

  } else {
    return null;
  }


}









export async function searchUser(query: string): Promise<UserProps[]> {
  const client = await clientPromise;
  const collection = client.db('trump').collection('users');

  
  return await collection
    .aggregate<UserProps>([
      {
        $search: {
          index: 'name-index',
          /* 
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
            score: {
              // search ranking algorithm: multiply relevance score by the log1p of follower count
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'followers'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        // filter out users that are not verified
        $match: {
          verified: true
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}

export async function getUserCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('trump').collection('users');
  return await collection.countDocuments();
}



export async function updateUser(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  // check dupplicated nickname




  return await collection.updateOne({ username }, { $set: { bio } });
}




export async function checkUser(id: string, password: string): Promise<UserProps | null> {
  

  const client = await clientPromise;
  const collection = client.db('trump').collection('users');
  const results = await collection.findOne<UserProps>(
    {
      id,
      password,
    },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
      //bioMdx: await getMdxSource(results.bio || placeholderBio)
    };
  } else {
    return null;
  }
}



// get user 



export async function getAllUsersForSettlement(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {
        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}




export async function getAllUsersForSettlementOfStore(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

        // when settlementAmountOfFee is exist, check settlementAmountOfFee is 0

        settlementAmountOfFee: {
          $exists: true,
          $eq: "0"
        }, 

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}




// update settlementAmountOfFee for User collection
export async function updateSettlementAmountOfFee(
  walletAddress: string,
  settlementAmountOfFee: string,
) {

  console.log('updateSettlementAmountOfFee walletAddress: ' + walletAddress + ' settlementAmountOfFee: ' + settlementAmountOfFee);
  
  const client = await clientPromise;
  const collection = client.db('trump').collection('users');

  return await collection.updateOne(
    { walletAddress },
    {
      $set: {
        settlementAmountOfFee,
      }
    }
  );
  
  }

// getAllUsersForSettlementOfFee

export async function getAllUsersForSettlementOfFee(
  limit: number,
  page: number,
): Promise<ResultProps> {


  const client = await clientPromise;
  const collection = client.db('trump').collection('users');


  console.log('limit: ' + limit);
  console.log('page: ' + page);

  // walletAddress is not empty and not null

  const users = await collection
    .find<UserProps>(
      {


        walletAddress: { $exists: true, $ne: null },
        walletPrivateKey: { $exists: true, $ne: null },

        // when settlementAmountOfFee is exist, check convert settlementAmountOfFee to float number and check settlementAmountOfFee is greater than 0

        settlementAmountOfFee: {
          $exists: true,
          $ne: "0"
        }, 

      },
      {
        limit: limit,
        skip: (page - 1) * limit,
      },
      
    )
    .sort({ _id: -1 })
    .toArray();


  const totalCount = await collection.countDocuments(
    {
      walletAddress: { $exists: true, $ne: null },
      walletPrivateKey: { $exists: true, $ne: null },
    }
  );

  return {
    totalCount,
    users,
  };

}


// setEscrowWalletAddressByWalletAddress
export async function setEscrowWalletAddressByWalletAddress(
  walletAddress: string,
  escrowWalletAddress: string,
  escrowWalletPrivateKey: string,
) {



  const client = await clientPromise;
  const collection = client.db('trump').collection('users');

  return await collection.updateOne(
    { walletAddress },
    {
      $set: {
        escrowWalletAddress,
        escrowWalletPrivateKey,
      }
    }
  );
  
}



// setTronWalletAddressByWalletAddress
export async function setTronWalletAddressByWalletAddress(
  walletAddress: string,
  tronWalletAddress: string,
  tronWalletPrivateKey: string,
) {



  const client = await clientPromise;
  const collection = client.db('trump').collection('users');

  return await collection.updateOne(
    { walletAddress },
    {
      $set: {
        tronWalletAddress,
        tronWalletPrivateKey,
      }
    }
  );
  
}
