import { Transaction } from "@mysten/sui/transactions"
import { invoicePackageID, mintPackageID } from "./const"

export const mintWithInvoice = async (tx: Transaction, USDC: any, address: string, taxCoin: any) => {
    tx.transferObjects(
        USDC,
        "0x70cd8ec3757a6baf7c348fc4c17b3ed5bdcf8ba240cfed1645bff1db37a5d6db"
    )
    tx.moveCall({
        target: `${mintPackageID}::coin_example::mint`,
        arguments:[
            tx.object("0x31ff185f257b905ddcbf3099875b7e9c032a89dec8b28552116b8814310bbc6e"),
            tx.pure.u64(1000000000),
            tx.pure.address("0x768188f2de419916a8f5bf78d63c510b5e5acafe5bbecaac7d3e63222d3c8b93")
        ]
    })
    tx.moveCall({
        target: `${invoicePackageID}::invoice::init_invoice`,
        arguments: [
            tx.object(),//tax coin
            tx.object("0x7e4194fd72d13cab3f6ff648fc3728bccf28444f4abdd2b96b67ca0f35e8cb0b"),//system
            tx.pure.string("minter")
        ]
    })
}

// todo (s):
/* 
put tax coin owned by the protocol into invoice and execute.
*/