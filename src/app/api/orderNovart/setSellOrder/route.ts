import { NextResponse, type NextRequest } from "next/server";

import {
	insertSellOrder,
} from '@lib/api/orderNovart';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, novartAmount, fietAmount, fietCurrency, rate, payment, privateSale } = body;

  console.log("setSellOrder walletAddress", walletAddress);
  

  const result = await insertSellOrder({
    walletAddress: walletAddress,
    novartAmount: novartAmount,
    fietAmount: fietAmount,
    fietCurrency: fietCurrency,
    rate: rate,
    payment: payment,
    privateSale: privateSale,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
