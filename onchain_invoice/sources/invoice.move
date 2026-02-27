module onchain_invoice::invoice;

use sui::clock::{Self, Clock};
use std::string::String;
use sui::coin::{Self, Coin};
use sui::balance::{Self, Balance};
use onchain_invoice::tax_coin::TAX_COIN;

public struct Invoice has key, store {
    id: UID,
    protocol: String,
    amount: u64,
    timestamp: u64,
    invoice_number: u64,
}

public struct System has key, store {
    id: UID,
    count: u64,
    tax_value: u64,
    balance: Balance<TAX_COIN>
}

#[allow(lint(self_transfer))]
public fun init_invoice(tax: Coin<TAX_COIN>, system: &mut System, protocol: String, clock: &Clock, ctx: &mut TxContext) {
    let id = object::new(ctx);
    let amount = coin::value(&tax);
    let timestamp = clock::timestamp_ms(clock);
    system.count = system.count + 1;
    let invoice_number = system.count;
    let invoice = Invoice {
        id,
        protocol,
        amount,
        timestamp,
        invoice_number,
    };
    let balance = coin::into_balance(tax);
    balance::join(&mut system.balance, balance);
    transfer::public_transfer(invoice, ctx.sender());
}