module onchain_invoice::tax_coin;

use sui::coin_registry;
use sui::coin::{Self, TreasuryCap};

public struct TAX_COIN has drop {}

fun init(witness: TAX_COIN, ctx: &mut TxContext) {
    let (builder, treasury_cap) = coin_registry::new_currency_with_otw(
        witness,
        6,
        b"TAX".to_string(),
        b"TAX_COIN".to_string(),
        b"fake tax coin for protocol".to_string(),
        b"https://cdn-icons-png.flaticon.com/512/8744/8744976.png".to_string(),
        ctx
    );

    let metadata_cap = builder.finalize(ctx);
    transfer::public_transfer(metadata_cap, ctx.sender());
    transfer::public_transfer(treasury_cap, ctx.sender());
}

// public fun faucet(treasury_cap: &mut TreasuryCap<>, amount: u64, recipient: address, ctx: &mut TxContext) {
//     let coin = coin::mint(treasury_cap, amount, ctx);
//     transfer::public_transfer(coin, recipient);
// }