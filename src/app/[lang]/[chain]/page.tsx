'use client';

import { useState, useEffect, use } from "react";

import Image from "next/image";

import thirdwebIcon from "@public/thirdweb.svg";


import { client } from "../../client";

import { createThirdwebClient } from "thirdweb";

import {
  //ThirdwebProvider,
  ConnectButton,

  useConnect,

  useReadContract,

  useActiveWallet,

  useActiveAccount,

  useSetActiveWallet,
  useConnectedWallets,

  darkTheme,

  lightTheme,

  useConnectModal,
  
} from "thirdweb/react";

import { inAppWallet } from "thirdweb/wallets";

import {
  polygon,
  arbitrum,
} from "thirdweb/chains";


import {
  getContract,
  //readContract,
} from "thirdweb";


import { balanceOf, transfer } from "thirdweb/extensions/erc20";
 


import { getUserPhoneNumber } from "thirdweb/wallets/in-app";


import { toast } from 'react-hot-toast';

import {
  useRouter,
  useSearchParams
}from "next//navigation";
import { add } from "thirdweb/extensions/farcaster/keyGateway";


import { getOwnedNFTs } from "thirdweb/extensions/erc721";


import GearSetupIcon from "@/components/gearSetupIcon";


//import LanguageSelector from "@/components/LanguageSelector";

import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../dictionaries";
import { parse } from "path";
import { N } from "ethers";


import { useQRCode } from 'next-qrcode';
import { acceptBuyOrder } from "@/lib/api/order";
import App from "next/app";









const wallets = [
  inAppWallet({
    auth: {
      options: [
        "telegram",
      ],
    },
  }),
];


const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon

const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum



// TRUMP contract address
const contractAddressNovart = "0xF7AFCb91c027Ae6287361Ffefa80F1E3D6899c24"; // TRUMP on Polygon


/*
const client = createThirdwebClient({
  clientId: "dfb94ef692c2f754a60d35aeb8604f3d",
});
*/





export default function Index({ params }: any) {


  //console.log("params", params);

  // get params from the URL

  const searchParams = useSearchParams();
 
  const wallet = searchParams.get('wallet');

  //console.log(wallet);

  const { Canvas } = useQRCode();


  const { connect, isConnecting } = useConnectModal();

  const handleConnect = async () => {
    await connect({
      chain: params.chain === "arbitrum" ? arbitrum : polygon,
      client,
      wallets,

      showThirdwebBranding: false,
      theme: 'light',
      
      /*
      appMetadata: {
        name: "GoodTether",
        description: "GoodTether",
        url: "https://wallet.novarwa.io",
        //icons: ["https://wallet.novarwa.io/logo.png"],
      },
      */

      size: 'compact',

      /*
      size: 'wide',

      welcomeScreen: {
        title: "Custom Title",
        subtitle: "Custom Subtitle",
        img: {
          src: "https://example.com/image.png",
          width: 100,
          height: 100,
        },
      },
      */
    
     locale: 'en_US',
      
    });
  };



  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: params.chain === "arbitrum" ? arbitrum : polygon,
  
  
  
    // the contract's address
    ///address: contractAddress,

    address: params.chain === "arbitrum" ? contractAddressArbitrum : contractAddress,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });



  // TRUMP contract
  const contractNovart = getContract({
    client,
    chain: polygon,
    address: contractAddressNovart,
  });



  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    My_Balance: "",
    My_Nickname: "",
    My_Buy_Trades: "",
    My_Sell_Trades: "",
    Buy: "",
    Sell: "",
    Buy_USDT: "",
    Sell_USDT: "",
    Sell_TRUMP: "",
    Contact_Us: "",
    Buy_Description: "",
    Sell_Description: "",
    Send_USDT: "",
    Pay_USDT: "",
    Coming_Soon: "",
    Open_Orders: "",
    Please_connect_your_wallet_first: "",

    Please_verify_your_account_first_for_selling: "",

    Apply_for_Listing_New_Token: "",
    Apply_for_Listing_New_Seller: "",

    Apply_Buy_Order: "",
    Accept_Buy_Order: "",

    Profile_Settings: "",

    Disconnect_Wallet: "",

    Are_you_sure_you_want_to_disconnect_your_wallet: "",

    Sign_in_with_Wallet: "",

    Copy_Wallet_Address: "",

    Copied_Wallet_Address: "",

  } );

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

  const {
    title,
    description,
    menu,
    Go_Home,
    My_Balance,
    My_Nickname,
    My_Buy_Trades,
    My_Sell_Trades,
    Buy,
    Sell,
    Buy_USDT,
    Sell_USDT,
    Sell_TRUMP,
    Contact_Us,
    Buy_Description,
    Sell_Description,
    Send_USDT,
    Pay_USDT,
    Coming_Soon,
    Open_Orders,
    Please_connect_your_wallet_first,

    Please_verify_your_account_first_for_selling,

    Apply_for_Listing_New_Token,
    Apply_for_Listing_New_Seller,

    Apply_Buy_Order,
    Accept_Buy_Order,

    Profile_Settings,

    Disconnect_Wallet,

    Are_you_sure_you_want_to_disconnect_your_wallet,

    Sign_in_with_Wallet,

    Copy_Wallet_Address,

    Copied_Wallet_Address,

  } = data;










  //const { connect, isConnecting, error } = useConnect();

  ///console.log(isConnecting, error);



  const router = useRouter();

  





  // get the active wallet
  const activeWallet = useActiveWallet();



  ///console.log('activeWallet', activeWallet);



  //const setActiveAccount = useSetActiveWallet();
 

  //const connectWallets = useConnectedWallets();

  //console.log('connectWallets', connectWallets);

  //const smartConnectWallet = connectWallets?.[0];
  //const inAppConnectWallet = connectWallets?.[1];

  //console.log("connectWallets", connectWallets);
  
  /*
  useEffect(() => {

    if (inAppConnectWallet) {
      setActiveAccount(inAppConnectWallet);
    }

  } , [inAppConnectWallet, setActiveAccount]);
  */

  //inAppConnectWallet && setActiveAccount(inAppConnectWallet);



  //const activeAccount = useActiveAccount();
  //const address = activeAccount?.address;

  /*
  const setActiveAccount = useSetActiveWallet();

  const connectWallets = useConnectedWallets();

  const smartConnectWallet = connectWallets?.[0];
  const inAppConnectWallet = connectWallets?.[1];
  */

  const activeAccount = useActiveAccount();
  const address = activeAccount?.address || "";


 



  console.log('address', address);



  ///console.log('address', address);



  const [balance, setBalance] = useState(0);

  useEffect(() => {

    if (!address) return;
    // get the balance


    if (!contract) {
      return;
    }

    const getBalance = async () => {

      try {
        const result = await balanceOf({
          contract,
          address: address,
        });
    
        if (!result) return;
    
        setBalance( Number(result) / 10 ** 6 );

      } catch (error) {
        console.error("Error getting balance", error);
      }

    };

    if (address) getBalance();

    // get the balance in the interval

    const interval = setInterval(() => {
      if (address) getBalance();
    }, 1000);


    return () => clearInterval(interval);

  } , [address, contract]);


  // TRUMP balance
  const [trumpBalance, setNovartBalance] = useState(0);
  useEffect(() => {
      
      if (!address) return;
      // get the balance

      if (!contractNovart) {
        return;
      }

      const getNovartBalance = async () => {

        try {
          const result = await balanceOf({
            contract: contractNovart,
            address: address,
          });
      
          if (!result) return;
      
          setNovartBalance( Number(result) / 10 ** 18 );
  
        } catch (error) {
          console.error("Error getting balance", error);
        }

      };

      if (address) getNovartBalance();

      // get the balance in the interval

      const interval = setInterval(() => {
        if (address) getNovartBalance();
      }, 1000);


      return () => clearInterval(interval);

  } , [address, contractNovart]);

  



  const [loadingAnimation, setLoadingAnimation] = useState(false);
  // loadingAnimation duration is 2 seconds
  // and then 10 seconds later it will be toggled again

  useEffect(() => {

    if (loadingAnimation) {
      setTimeout(() => {
        setLoadingAnimation(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoadingAnimation(true);
      }, 10000);
    }


    


  } , [loadingAnimation]);


  /*
  const { data: balanceData } = useReadContract({
    contract, 
    method: "function balanceOf(address account) view returns (uint256)", 

    params: [ address ], // the address to get the balance of

  });

  console.log(balanceData);

  useEffect(() => {
    if (balanceData) {
      setBalance(
        Number(balanceData) / 10 ** 6
      );
    }
  }, [balanceData]);


  console.log(balance);
  */





  //console.log("address", address);

      

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {


    if (address) {

      //const phoneNumber = await getUserPhoneNumber({ client });
      //setPhoneNumber(phoneNumber);


      getUserPhoneNumber({ client }).then((phoneNumber) => {
        setPhoneNumber(phoneNumber || "");
      });



    }

  } , [address]);

 

  ////console.log(phoneNumber);




 

  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("/profile-default.png");
  const [userCode, setUserCode] = useState("");


  const [seller, setSeller] = useState(null) as any;


  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {

      if (!address) {
          return;
      }

      
      const fetchData = async () => {

          const response = await fetch("/api/user/getUser", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  walletAddress: address,
              }),
          });

          const data = await response.json();

          ////console.log("getUser data.result", data.result);


          if (data.result) {
              setNickname(data.result.nickname);
              data.result.avatar && setAvatar(data.result.avatar);
              setUserCode(data.result.id);

              setSeller(data.result.seller);

          } else {
              setNickname("");
              setAvatar("/profile-default.png");
              setUserCode("");
              setSeller(null);
          }
          

          setLoadingUser(false);
      };

      fetchData();

  }, [address]);



  const [countOfOpenOrders, setCountOfOpenOrders] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("/api/order/getCountOfOpenOrders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
        });

        const data = await response?.json();

        console.log("data", data);

        if (data.result) {

            setCountOfOpenOrders(data.result);
        }
    };

    fetchData();

  } , []);




  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("/api/user/getBestSellers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
        });

        const data = await response.json();

        //console.log("data", data);

        if (data.result) {

            setBestSellers(data.result.users);
        }
    };

    fetchData();

  }, []);  
  


  ///console.log("bestSellers", bestSellers);




  const [buyTrades, setBuyTrades] = useState([]);

  useEffect(() => {

    if (!address) {
      return;
    }

    const fetchData = async () => {
        const response = await fetch("/api/order/getBuyTradesProcessing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: address,
              limit: 10,
              page: 1,
            }),
        });

        const data = await response.json();

        //console.log("data", data);

        if (data.result) {

          setBuyTrades(data.result.orders);
        }
    };

    fetchData();

  } , [address]);





  const [sellTrades, setSellTrades] = useState([]);

  useEffect(() => {

    if (!address) {
      return;
    }

    const fetchData = async () => {
        const response = await fetch("/api/order/getSellTradesProcessing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: address,
              limit: 10,
              page: 1,
            }),
        });

        const data = await response.json();

        //console.log("data", data);

        if (data.result) {

          setSellTrades(data.result.orders);
        }
    };

    fetchData();

  } , [address]);




  const [storeCodeNumber, setStoreCodeNumber] = useState('');

  useEffect(() => {

    const fetchStoreCode = async () => {

      const response = await fetch('/api/order/getStoreCodeNumber', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      //console.log('getStoreCodeNumber data', data);

      setStoreCodeNumber(data?.storeCodeNumber);

    }

    fetchStoreCode();

  } , []);






  // if chain is tron, then get tron wallet address

  //console.log("params.chain", params.chain);


  console.log("address", address);


  // usdt balance
  const [usdtBalance, setUsdtBalance] = useState(0);





  // chainBalance
  const [chainBalance, setChainBalance] = useState(0);
  useEffect(() => {

    if (params.chain === "polygon") {
      setChainBalance(balance);
    } else if (params.chain === "arbitrum") {
      setChainBalance(balance);
    } else if (params.chain === "ethereum") {
      setChainBalance(balance);
    } else {
      setChainBalance(0);
    }
  }

  , [balance, params.chain]);
      



  return (


    <main className="p-4 pb-10 min-h-[100vh] flex-col items-start justify-center container max-w-screen-lg mx-auto
      
    ">


      <div className="py-0 w-full">
        
        
        <Header
          lang={params.lang}
          chain={params.chain}
        />

        <div className="w-full flex flex-row gap-2 justify-between items-center">

          {/* blockchain network selection */}
          {/*
          <div className=" flex flex-row gap-2 justify-start items-center">

            <Image
              src="/logo-polygon.png"
              alt="Polygon"
              width={50}
              height={50}
              className="rounded-lg w-10 h-10 md:w-14 md:h-14"
            />

          </div>
          */}

          {/* language selection */}
          
          <div className=" flex flex-row gap-2 justify-end items-center">
            <select
              className="
                p-2 bg-blue-500 text-white rounded w-40
                transition duration-300 ease-in-out
                transform hover:-translate-y-1

              "
              onChange={(e) => {
                const lang = e.target.value;
                router.push(
                  "/" + lang + "/" + params.chain
                );
              }}
            >
              <option
                value="en"
                selected={params.lang === "en"}
              >
                English(US)
              </option>
              <option
                value="zh"
                selected={params.lang === "zh"}
              >
                中文(ZH)
              </option>
              <option
                value="ja"
                selected={params.lang === "ja"}
              >
                日本語(JP)
              </option>
              <option
                value="kr"
                selected={params.lang === "kr"}
              >
                한국어(KR)
              </option>
            </select>

          </div>
          

        </div>
        

        <div className="w-full flex flex-col justify-between items-center gap-2 mb-5">
          <AppBarComponent />

          {/* select input for network selection (polygon, arbitrum) */}
          {/*
          <div className="flex flex-row gap-2 justify-center items-center">
            <button
              onClick={() => {
                // switch to polygon

                address && activeWallet?.disconnect();
                router.push(
                  "/" + params.lang + "/polygon"
                );
              }}
              className={`
                ${params.chain === "polygon" ? "bg-zinc-200 text-zinc-800" : "bg-zinc-800 text-zinc-300"} p-2 rounded`}
            >
              Polygon
            </button>
            <button
              onClick={() => {
                // switch to arbitrum
                address && activeWallet?.disconnect();
                router.push(
                  "/" + params.lang + "/arbitrum"
                );
              }}
              className={`
                ${params.chain === "arbitrum" ? "bg-zinc-200 text-zinc-800" : "bg-zinc-800 text-zinc-300"} p-2 rounded`}
            >
              Arbitrum
            </button>


          </div>
          */}

          {/* store code number */}
          {/*
          <div className="w-full flex flex-row gap-2 items-center justify-start text-zinc-300 text-lg font-se"
          >
            SC: {storeCodeNumber}
          </div>
          */}

        </div>


        {/* announcement */}
        {/*
        <div className="w-full flex flex-col bg-zinc-800 p-5 rounded-lg text-start gap-2 mb-5
                        hover:shadow-lg
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
        ">
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <h2 className="text-xl md:text-3xl font-semibold text-zinc-100 ">
              {title}
            </h2>
          </div>
          <p className="text-zinc-300">{description}</p>

        </div>
        */}

  



        {!address && (

          <div className="w-full flex flex-row justify-start items-center gap-2">

            <ConnectButton
              client={client}
              wallets={wallets}
              accountAbstraction={{
                chain: polygon,
                sponsorGas: true
              }}
              theme={"light"}
              connectButton={{
                label: Sign_in_with_Wallet,
              }}
              connectModal={{
                size: "wide", 
                titleIcon: "https://trump69.vercel.app/logo-trump.webp",                       
                showThirdwebBranding: false,

              }}
              //locale={"ko_KR"}
              //locale={"en_US"}
              locale={
                params.lang === "en" ? "en_US" :
                params.lang === "zh" ? "en_US" :
                params.lang === "ja" ? "ja_JP" :
                params.lang === "kr" ? "ko_KR" :
                "en_US"
              }
            />





             

          </div>
         

        )}

        {/* disconnect button */}
        {address && (
          <div className="w-full flex flex-col items-start justify-center gap-5">
            {/* disconnect button */}
            
            <button
              onClick={() => {

                confirm(Are_you_sure_you_want_to_disconnect_your_wallet) && 
                activeWallet?.disconnect();

                window.location.reload();

              }}
              className="text-lg bg-red-500 text-white px-4 py-2 rounded-lg
                hover:bg-red-600
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
              "
            >
              {Disconnect_Wallet}
            </button>
          </div>
        )}

        {/* address */}


        {/*address && (
          <div className="mt-0 w-full flex items-start justify-start gap-5">
            <Image
              src="/icon-wallet-live.gif"
              alt="Wallet"
              width={65}
              height={25}
              className="rounded"
            />

          </div>
        )*/}
            


        <div className="mt-2 w-full flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-5 mb-10">
              
              {/* My Nickname */}
              <div className="w-full flex flex-col p-5 rounded-lg text-center
                bg-zinc-800
                hover:shadow-lg
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
              ">



                <div className="flex flex-row justify-start items-center gap-2">
                  <Image
                    src={avatar || "/profile-default.png"}
                    alt="Profile Image"
                    width={35}
                    height={35}
                    priority={true} // Added priority property
                    className="rounded-full"
                    style={{
                        objectFit: 'cover',
                        width: '45px',
                        height: '45px',
                    }}
                  />

                  <p className="text-sm md:text-xl text-zinc-100">
                    {My_Nickname}
                  </p>

                  <button
                      onClick={() => {
                        router.push(
                          "/" + params.lang + "/" + params.chain + "/seller-apply"
                        );
                      }}
                      className="p-2 bg-zinc-200 text-zinc-800 rounded-lg"
                    >
                      {Profile_Settings}
                  </button>

                </div>
    
                
                {address && loadingUser ? (

                  
                  <div className="mt-4 flex flex-row justify-center items-center">


                    <Image
                      src="/loading.png"
                      alt="Loading"
                      width={35}
                      height={35}
                      className="animate-spin hidden"
                    />

                  </div>
                  

                ) : (

                  <div className="mt-4 flex flex-row gap-2 justify-center items-center">
                    <h2 className="text-3xl font-semibold text-zinc-100">
                      {nickname}
                    </h2>
                    {userCode && (
                      <Image
                        src="/verified.png"
                        alt="Verified"
                        width={20}
                        height={20}
                        className="rounded-lg"
                      />
                    )}
                    {seller && (
                      <Image
                        src="/best-seller.png"
                        alt="Best Seller"
                        width={20}
                        height={20}
                        className="rounded-lg"
                      />
                    )}
                  </div>

                )}




                {/* apply button of listing for sellers */}
                {/*
                <div className=" flex flex-row gap-2 justify-center items-center mt-10">
                  <button
                    onClick={() => {
                      // apply for listing new token
                      //console.log("apply for listing new token");

                      if (!address) {
                        toast.error(Please_connect_your_wallet_first);
                        return;
                      }

                      router.push(
                        "/" + params.lang + "/" + params.chain + "/seller-apply"
                      );

                    }}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
                  >
                    <div className="flex flex-row justify-between items-center gap-2">
                      <p className="text-lg font-semibold text-white">
                        {Apply_for_Listing_New_Seller}
                      </p>
                      <Image
                        src="/goto-icon.webp"
                        alt="Go"
                        width={20}
                        height={20}
                      />
                    </div>
                  </button>
                </div>
                */}


              
                <div className="flex flex-col gap-2 mt-5">


                  <button
                    //disabled={!address}
                    onClick={() => {
                      // my sell trades
                      //console.log("my sell trades");

                      /*
                      if (!address) {
                        toast.error('Please connect your wallet first');
                        return;
                      }


                      if (!seller && !userCode) {
                        toast.error(Please_verify_your_account_first_for_selling);
                        return;
                      }
                      */

                      // redirect to sell trades page
                      router.push(
                        "/" + params.lang + "/" + params.chain + "/sell-trump"
                      );

                    }}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    <div className="flex flex-row justify-between items-center gap-2">
                      <p className="text-lg font-semibold text-white">
                        TRUMP{' '}{Sell}
                      </p>
                      <Image
                        src="/goto-icon.webp"
                        alt="Go"
                        width={20}
                        height={20}
                      />
                    </div>
                  </button>


 
                  <button
                    //disabled={!address}
                    onClick={() => {
                      // my sell trades
                      //console.log("my sell trades");

                      /*
                      if (!address) {
                        toast.error('Please connect your wallet first');
                        return;
                      }


                      if (!seller && !userCode) {
                        toast.error(Please_verify_your_account_first_for_selling);
                        return;
                      }
                      */

                      // redirect to sell trades page
                      router.push(
                        //"/" + params.lang + "/" + params.chain + "/sell-usdt"

                        wallet === "smart" ?
                        "/" + params.lang + "/" + params.chain + "/sell-usdt?wallet=smart"
                        :
                        "/" + params.lang + "/" + params.chain + "/sell-usdt"

                      );

                    }}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    <div className="flex flex-row justify-between items-center gap-2">
                      <p className="text-lg font-semibold text-white">
                        USDT{' '}{Sell}
                      </p>
                      <Image
                        src="/goto-icon.webp"
                        alt="Go"
                        width={20}
                        height={20}
                      />
                    </div>
                  </button>


                  <button
                    //disabled={!address}
                    onClick={() => {
                      // my sell trades
                      //console.log("my sell trades");

                      /*
                      if (!address) {
                        toast.error(Please_connect_your_wallet_first);
                        return;
                      }

                      if (!seller && !userCode) {
                        toast.error(Please_verify_your_account_first_for_selling);
                        return;
                      }
                      */

                      // redirect to sell trades page
                      router.push(
                        "/" + params.lang + "/" + params.chain + "/accept-buyorder-usdt"
                      );

                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    <div className="flex flex-row justify-between items-center gap-2">
                      <p className="text-lg font-semibold text-white">
                        {Accept_Buy_Order}
                      </p>
                      <Image
                        src="/goto-icon.webp"
                        alt="Go"
                        width={20}
                        height={20}
                      />
                    </div>
                  </button>

                </div>
                




              </div>



            <div
              className="flex flex-col bg-zinc-800 p-5 rounded-lg
              w-full xl:w-1/2
              hover:shadow-lg
              transition duration-300 ease-in-out
              transform hover:-translate-y-1

              "
            >


              <div className=" flex flex-row justify-between items-center">

                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  {/* Tether USDT logo */}
                  
                  <div className="flex flex-row gap-2 items-center">
                    <Image
                      src="/icon-bank.png"
                      alt="Bank"
                      width={35}
                      height={35}
                      className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"

                    />

                    <p className="text-sm xl:text-lg text-zinc-100">
                      {My_Balance}
                    </p>
                  </div>

                  {/* select network */}
                  {/*
                  <div className="flex flex-row gap-2 items-center">
                    <select 
                      className="p-2 bg-zinc-800 text-white rounded"
                      onChange={(e) => {
                        const chain = e.target.value;
                        router.push(
                          "/" + params.lang + "/" + chain
                        );
                      }}
                    >
                      <option
                        value="tron"
                        selected={params.chain === "tron"}
                      >
                        Tron
                      </option>
                      <option
                        value="ethereum"
                        selected={params.chain === "ethereum"}
                      >
                        Ethereum
                      </option>
                      <option
                        value="polygon"
                        selected={params.chain === "polygon"}
                      >
                        Polygon
                      </option>
                      <option
                        value="arbitrum"
                        selected={params.chain === "arbitrum"}
                      >
                        Arbitrum
                      </option>

                    </select>
                  </div>
                  */}

                


                  {/* button for polygon explorer */}
                  {/*
                  {address && !loadingAnimation
                    ? (
                      <button
                          onClick={() => {
                              window.open(`
                                ${params.chain === "arbitrum" ? "https://arbiscan.io/address/" : "https://polygonscan.com/address/"}${address}
                                  `, "_blank");
                          }}
                          className="p-2 bg-zinc-200 text-zinc-800 rounded"
                      >
                          <Image
                              //src="/logo-polygon.png"

                              src={`/logo-${params.chain}.png`}
                              alt="Network"
                              width={18}
                              height={18}
                              
                          />
                      </button>
                  ) : (
                    <Image
                      //src="/logo-polygon.png"
                      src={`/logo-${params.chain}.png`}
                      alt="Network"
                      width={20}
                      height={20}
                      className='ml-2 animate-spin'
                    />
                
                  )}
                  */}
                    
                </div>


              </div>

              {/* check box for Native Wallet */}
              {/*
              {address && (
                <div className="mt-5 flex flex-row items-center gap-2">
                  <input
                    disabled={true}
                    type="checkbox"
                    checked={
                      activeWallet === inAppConnectWallet
                    }
                    onChange={(e) => 
                      
                      //e.target.checked ? setActiveAccount(inAppConnectWallet) : setActiveAccount(smartConnectWallet)

                      e.target.checked ?
                      router.push(window.location.pathname)
                      :
                      router.push(window.location.pathname + "?wallet=smart")

                    } 
                    className="w-5 h-5"
                  />
                  <label className="text-sm text-zinc-400">Pro Wallet</label>
                </div>
              )}
              */}


              {/*
              <div className="mt-4 flex flex-row gap-2 justify-between items-center
                border border-gray-800 rounded-lg text-center p-2 mb-5
              ">
                <Image
                  src={`/logo-${params.chain}.png`}
                  alt="Network"
                  width={35}
                  height={35}
                  className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                />

                <div className="text-4xl font-semibold text-zinc-100">
                  {Number(chainBalance).toFixed(2)}
                </div>
                <p className="w-12 text-sm text-gray-600">
                  {params.chain === "polygon" ? "POL" : params.chain === "arbitrum" ? "ARB" : params.chain === "tron" ? "TRX" : params.chain === "ethereum" ? "ETH" : ""}
                </p>

                <button
                  onClick={() => {
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/send-coin/?wallet=" + wallet
                    );

                  }}
                  className="text-sm text-blue-500 hover:underline"
                >
                  <Image
                    src="/goto-icon.webp"
                    alt="Send"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              */}
              {/* address copy button */}
              {address && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    toast.success(Copied_Wallet_Address);
                  }}
                  className="p-2 bg-zinc-200 text-zinc-800 rounded-lg mt-4"
                >
                  <div className="flex flex-row justify-between items-center gap-2">
                    <Image
                      src="/icon-copy.png"
                      alt="Copy"
                      width={20}
                      height={20}
                    />
                    <span>{Copy_Wallet_Address}</span>
                  </div>
                </button>
              )}

              {/* wallet address is 0x2423...5334
              and QR code */}
              {address && (

                <div className="mt-4 flex flex-col gap-2 justify-center items-center">

                  <p className="text-xs xl:text-sm text-zinc-300">
                    {address}
                  </p>

                  {/* qr code image */}
                  <Canvas
                    text={address}
                    options={{
                      //level: 'M',
                      margin: 2,
                      scale: 4,
                      width: 200,
                      color: {
                          dark: '#000000FF',
                          light: '#FFFFFFFF',
                      },
                    }}
                  />

                </div>


              )}



              {/* TRUMP balance */}
              <div className="mt-4 flex flex-row gap-2 justify-between items-center p-2
                bg-yellow-500 text-white rounded-lg text-center
                hover:shadow-lg
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
              "
              >
                <Image
                  src="/logo-trump.webp"
                  alt="TRUMP"
                  width={35}
                  height={35}
                  className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                />

                <div className="text-4xl font-semibold text-zinc-100">
                  {Number(trumpBalance).toFixed(2)}
                </div>
                <p className="w-12 text-sm text-zinc-100">
                  TRUMP
                </p>

                <button
                  onClick={() => {
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/send-token/?wallet=" + wallet + "&token=TRUMP"
                    );

                  }}
                  className="text-sm text-blue-500 hover:underline"
                >
                  <Image
                    src="/goto-icon.webp"
                    alt="Send"
                    width={20}
                    height={20}
                  />
                </button>
              </div>


              {/* USDT balance */}
              <div className="mt-4 flex flex-row gap-2 justify-between items-center p-2
                bg-yellow-500 text-white rounded-lg text-center
                hover:shadow-lg
                transition duration-300 ease-in-out
                transform hover:-translate-y-1
              ">
                <Image
                  src="/logo-tether.png"
                  alt="USDT"
                  width={35}
                  height={35}
                  className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                />

                  {/* floating point number to fixed 5 and text size small */}
                <div className="text-4xl font-semibold text-zinc-100">
                  {Number(usdtBalance).toFixed(2)}
                </div>
                <p className="w-12 text-sm text-zinc-100">
                  USDT
                </p>

                <button
                  onClick={() => {
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/send-token/?wallet=" + wallet + "&token=USDT"
                    );

                  }}
                  className="text-sm text-blue-500 hover:underline"
                >
                  <Image
                    src="/goto-icon.webp"
                    alt="Send"
                    width={20}
                    height={20}
                  />
                </button>
              </div>


              {/*
              <div className="mt-4 flex flex-row gap-2 justify-between items-center p-2">
                <Image
                  src="/token-sundog-icon.png"
                  alt="USDT"
                  width={35}
                  height={35}
                  className="rounded-lg w-8 h-8 xl:w-10 xl:h-10"
                />

                <div className="text-4xl font-semibold text-zinc-100">
                  {Number(balance).toFixed(2)}
                </div>
                <p className=" w-12 text-sm text-gray-600">SUNDOG</p>
                <button
                  onClick={() => {
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/send-token/?wallet=" + wallet + "&token=SUNDOG"
                    );

                  }}
                  className="text-sm text-blue-500 hover:underline"
                >
                  <Image
                    src="/goto-icon.webp"
                    alt="Send"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              */}


              <div className=" flex flex-col gap-2 justify-center items-center mt-10">

                {/* Go Buy TRUMP */}
                <button
                  onClick={() => {
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/buy-trump"
                    );
                  }}
                  className=" w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <div className="flex flex-row justify-between items-center gap-2">
                    <p className="text-lg font-semibold text-white">
                      TRUMP{' '}{Buy}
                    </p>
                    <Image
                      src="/goto-icon.webp"
                      alt="Go"
                      width={20}
                      height={20}
                    />
                  </div>
                  
                </button>

                {/* Go Buy USDT */}
                <button
                  onClick={() => {


                    // redirect to buy USDT page
                    router.push(
                      //"/" + params.lang + "/" + params.chain + "/buy-usdt"

                      wallet === "smart" ?
                      "/" + params.lang + "/" + params.chain + "/buy-usdt?wallet=smart"
                      :
                      "/" + params.lang + "/" + params.chain + "/buy-usdt"

                    );

                  }}
                  className=" w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <div className="flex flex-row justify-between items-center gap-2">
                    <p className="text-lg font-semibold text-white">
                      USDT{' '}{Buy}
                    </p>
                    <Image
                      src="/goto-icon.webp"
                      alt="Go"
                      width={20}
                      height={20}
                    />
                  </div>
                  
                </button>


                {/* Go Buy Order USDT */}

                <button
                  onClick={() => {


                    // redirect to buy USDT page
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/buyorder-usdt"
                    );

                  }}
                  className=" w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <div className="flex flex-row justify-between items-center gap-2">
                    <p className="text-lg font-semibold text-white">
                      {Apply_Buy_Order}
                    </p>
                    <Image
                      src="/goto-icon.webp"
                      alt="Go"
                      width={20}
                      height={20}
                    />
                  </div>
                </button>


              </div>




              {/* my address and copy button */}
              {/*
              <div className="flex flex-row justify-center items-center mt-4">

                {address && (
                  <>
                    <p className="text-zinc-300 text-xs w-80">
                      {address}
                    </p>

                    <button

                      onClick={() => {
                        navigator.clipboard.writeText(address);
                        toast.success('Address copied to clipboard');
                      }}
                      className="text-sm text-blue-500 ml-2 hover:underline"
                    >
                      Copy
                    </button>
                  </>
                )}

              </div>
              */}


              {/* send button */}
              
              <div className="flex flex-row gap-2 justify-center items-center mt-10">
                {/*
                <button
                  disabled={!address}
                  onClick={() => {
                    // send USDT
                    //console.log("send USDT");

                    if (!address) {
                      toast.error(Please_connect_your_wallet_first);
                      return;
                    }

                    // redirect to send USDT page
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/send-token/?wallet=" + wallet
                    );

                  }}
                  className=" w-40 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {Send_USDT}
                </button>
                */}

                  {/*
                <button
                  
                  //disabled={!address}

                  onClick={() => {
                    // pay USDT
                    //console.log("pay USDT");

                    if (!address) {
                      toast.error(Please_connect_your_wallet_first);
                      return;
                    }


                    // redirect to send USDT page
                    //router.push("/send-token");

                    // comming soon

                    toast.success(Coming_Soon);

                    //router.push('/' + params.lang + '/' + params.chain + '/sell-usdt');


                  }}
                  className=" w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {Pay_USDT}
                </button>
                */}
              </div>

              {/* Go Buy USDT */}
              {/*
              <div className="flex flex-row justify-center items-center mt-4">
                <button
                  onClick={() => {


                    // redirect to buy USDT page
                    router.push(
                      "/" + params.lang + "/" + params.chain + "/buy-usdt"
                    );

                  }}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {Buy_USDT}
                </button>
              </div>
              */}


            </div>







              {/*
              {!address && (

              
                    <ConnectButton

                      client={client}

                      wallets={wallets}
                    
                      
                      theme={"light"}




                      connectModal={{
                        size: "wide",
                        
                        //title: "Connect",

                        welcomeScreen: {
                          title: "Custom Title",
                          subtitle: "Custom Subtitle",
                          img: {
                            src: "https://example.com/image.png",
                            width: 100,
                            height: 100,
                          },
                        },

                      }}


                      
                      appMetadata={
                        {
                          logoUrl: "https://wallet.novarwa.io/logo.png",
                          name: "Next App",
                          url: "https://wallet.novarwa.io",
                          description: "This is a Next App.",

                        }
                      }

                    />


              )}
              */}
              

              

              




        </div>

        {/*}
        <div className="grid gap-4 lg:grid-cols-3 justify-center">

          <ArticleCard
            title={`${Buy_USDT} - ${Open_Orders} (${countOfOpenOrders}) EA`}
            
            href={`${params.lang}/buy-usdt`}

            description={Buy_Description}
          />

          
            
          <ArticleCard
            title={`${Sell_USDT} - ${Open_Orders} (${countOfOpenOrders}) EA`}
            href={`${params.lang}/sell-usdt`}
            description={Sell_Description}
          />
            


        </div>
        */}


        {/* Best Sellers */}
        {/*
        <div className="bg-zinc-800 p-5 rounded-lg text-center mt-10">
          <h2 className="text-3xl font-semibold text-zinc-100">
            Best Sellers
          </h2>
          <p className="text-zinc-300">Check out the best sellers</p>

          <div className="grid gap-4 lg:grid-cols-3 justify-center mt-4">


            {bestSellers.map((seller: any) => (
              <ArticleCard
                key={seller.id}
                title={seller.nickname}
                avatar={seller.avatar}
                href={`/buy-usdt`}
                description="Check out the best sellers"
              />
            ))}
 

          </div>
        </div>
        */}

      </div>



    </main>
  );
}




function Header(
  {
    lang,
    chain,
  } : {
    lang: string,
    chain: string,
  }
) {

  const router = useRouter();


  return (
    <header className="flex flex-col items-center mb-5 md:mb-10">

      {/* header menu */}
      <div className="w-full flex flex-row justify-between items-center gap-2
        bg-zinc-800 p-5 rounded-lg text-center
        hover:shadow-lg
        transition duration-300 ease-in-out
        transform hover:-translate-y-1
        
      ">
        <button
          onClick={() => {
            router.push(
              "/" + lang + "/" + chain
            );
          }}
        >
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/logo-trump.webp"
              alt="Circle Logo"
              width={35}
              height={35}
              className="rounded-full w-10 h-10 xl:w-14 xl:h-14"
            />
            <span className="text-lg xl:text-3xl text-zinc-100 font-semibold">
              TRUMP Wallet
            </span>
          </div>
        </button>

      </div>
      
    </header>
  );
}


function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}


function MarketResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">

      <ArticleCard
        avatar="/icon-game.png"
        title="P2E Game"
        href="/"
        description="Play to Earn games with USDT rewards"
      />

  
      <ArticleCard
        avatar="/icon-nft.png"
        title="NFT Marketplace"
        href="/"
        description="Trade NFTs with USDT"
      />

      <ArticleCard
        avatar="/icon-defi.png"
        title="DeFi Apps"
        href="/"
        description="DeFi applications with USDT"
      />

    </div>
  );
}





function ArticleCard(props: {
  avatar?: string;
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      
      //href={props.href + "?utm_source=next-template"}
      href={props.href}

      //target="_blank"

      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >

      <div className="flex justify-center">
        <Image
          src={props.avatar || thirdwebIcon}
          alt="avatar"
          width={38}
          height={38}
          priority={true} // Added priority property
          className="rounded-full"
          style={{
              objectFit: 'cover',
              width: '38px',
              height: '38px',
          }}
        />
      </div>

      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
