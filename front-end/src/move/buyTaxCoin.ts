// treasury 0x2f49232fceff4bef524fe91217e06881795b980b315a820dbda0fe82bc0c9a5b
// tax coin treasury cap 0x0bde21038a5187fcf5f48a36c64b102ea286d79728ea1b90811e590e986ab66d
import { Transaction } from "@mysten/sui/transactions"
import { invoicePackageID } from "./const"
export const buyTaxCoin = async (tx: Transaction, in_coin: any) => {
    tx.moveCall({
        target: `${invoicePackageID}::tax_coin::buy_quota`,
        arguments:[
            in_coin,
            tx.object("0x0bde21038a5187fcf5f48a36c64b102ea286d79728ea1b90811e590e986ab66d"),
            tx.object("0x2f49232fceff4bef524fe91217e06881795b980b315a820dbda0fe82bc0c9a5b")
        ]
    })
}
