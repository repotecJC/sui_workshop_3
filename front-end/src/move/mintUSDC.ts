import { Transaction } from "@mysten/sui/transactions";
import { invoicePackageID } from "./const";

export const mintUSDC = async (tx : Transaction, recipient: string, amount: number) => {
    tx.moveCall({
        target: `${invoicePackageID}::usdc::faucet`,
        arguments: [
            tx.object("0xcef6cc136b80eb9057ddb716699cbaa5784dfb6c1a89fff35bbe1333c0a621a1"),
            tx.pure.u64(amount),
            tx.pure.address(recipient),
        ],
    })
}
