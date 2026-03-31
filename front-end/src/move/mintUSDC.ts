import { Transaction } from "@mysten/sui/transactions";
import { invoicePackageID } from "./const";

export async function mintUSDC(tx : Transaction, recipient: string, amount: number) {
    tx.moveCall({
        target: `${invoicePackageID}::usdc::faucet`,
        arguments: [
            tx.object("0xba40a23aeab3d0019135f44b31d7422b8e54551b1c5f093d0e842ad662977bc5"),
            tx.pure.u64(amount),
            tx.pure.address(recipient),
        ],
    })
}