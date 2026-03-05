import AccountModel from "../model/accountModel.js"



export const createDefaultccount = async (shopId, session) => {
    const defaultAccount = [
        { name: "Sales Account", type: "INCOME", category: "SALES" },
        { name: "Service Income", type: "INCOME", category: "SALES" },
        { name: "Interest Income", type: "INCOME", category: "INTEREST" },
        { name: "General Income", type: "INCOME", category: "OTHER" },

        { name: "Purchase Account", type: "EXPENSE", category: "PURCHASE" },
        { name: "Cost of Goods Sold", type: "EXPENSE", category: "COGS" },
        { name: "Freight / Delivery Charges", type: "EXPENSE", category: "OTHER" },

        { name: "Inventory Account", type: "ASSET", category: "OTHER" },
        { name: "Cash Account", type: "ASSET", category: "CASH" },
        { name: "Bank Account", type: "ASSET", category: "BANK" },
        { name: "Accounts Receivable", type: "ASSET", category: "OTHER" },
        { name: "Prepaid Expenses", type: "ASSET", category: "OTHER" },
        { name: "Equipment / Machinery", type: "ASSET", category: "OTHER" },

        { name: "Accounts Payable", type: "LIABILITY", category: "OTHER" },
        { name: "GST Payable", type: "LIABILITY", category: "TAX" },
        { name: "Salary Payable", type: "LIABILITY", category: "OTHER" },
        { name: "Loan Account", type: "LIABILITY", category: "OTHER" },


        { name: "Owner Capital", type: "EQUITY", category: "OTHER" },
        { name: "Drawings", type: "EQUITY", category: "OTHER" }
    ]



    const operation = defaultAccount.map((acc) => ({
        updateOne: {
            filter: { shop: shopId, name: acc.name },
            update: {
                $setOnInsert: {
                    shop: shopId,
                    name: acc.name,
                    type: acc.type,
                    category: acc.category,
                    isSystem: true,
                    isActive: true,
                }
            },
            upsert: true
        }
    }))

    await AccountModel.bulkWrite(operation, { session })
}