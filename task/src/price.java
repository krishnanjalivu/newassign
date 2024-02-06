import java.util.Scanner;

public class price {

    private static double calculatetotal(double price, int quantity) {
        return price * quantity;
    }

    private static Discountname calculatediscount(int itemA, int itemB, int itemC, double subtotal, double priceA,
            double priceB, double priceC) {
        double discount = 0.0;
        String discountName = "No discount applied";
        double discounttier = 0.0;
        if (itemA + itemB + itemC > 30) {
            if (itemA > 15) {
                discounttier += (itemA - 15) * priceA * 0.5;
            }
            if (itemB > 15) {
                discounttier += (itemB - 15) * priceB * 0.5;
            }
            if (itemC > 15) {
                discounttier += (itemC - 15) * priceC * 0.5;
            }
        }

        discount = Math.max(discount, discounttier);

        if (discount == discounttier) {
            discountName = "Tiered 50% Discount";
        }

        if (itemA + itemB + itemC > 20) {
            double discountbulk = subtotal * 0.1;
            discount = Math.max(discount, discountbulk);
            if (discount == discountbulk) {
                discountName = "Bulk 10% Discount";
            }
        }

        double discountbulk50 = 0.0;
        if (itemA > 10 || itemB > 10 || itemC > 10) {
            if (itemA > 10) {
                discountbulk50 += itemA * priceA * 0.05;
            }
            if (itemB > 10) {
                discountbulk50 += itemB * priceB * 0.05;
            }
            if (itemC > 10) {
                discountbulk50 += itemC * priceC * 0.05;
            }

            discount = Math.max(discount, discountbulk50);

            if (discount == discountbulk50) {
                discountName = "Bulk 5% Discount";
            }
        }

        if (subtotal > 200) {
            double discountflat = 10.0;
            discount = Math.max(discount, discountflat);
            if (discount == discountflat) {
                discountName = "Flat $10 Discount";
            }

        }

        return new Discountname(discount, discountName);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        final double priceA = 20.0;
        final double priceB = 40.0;
        final double priceC = 50.0;
        final double giftwrapfee = 1.0;
        final double shipping = 5.0;
        final int packages = 10;
        int itemA, itemB, itemC;
        boolean giftA, giftB, giftC;
        System.out.print("Enter quantity of Product A: ");
        itemA = scanner.nextInt();
        System.out.print("Enter quantity of Product B: ");
        itemB = scanner.nextInt();
        System.out.print("Enter quantity of Product C: ");
        itemC = scanner.nextInt();
        System.out.print("Is Product A gift wrapped? (y/n): ");
        giftA = scanner.next().equalsIgnoreCase("y");
        System.out.print("Is Product B gift wrapped? (y/n): ");
        giftB = scanner.next().equalsIgnoreCase("y");
        System.out.print("Is Product C gift wrapped? (y/n): ");
        giftC = scanner.next().equalsIgnoreCase("y");
        double productA = calculatetotal(priceA, itemA);
        double productB = calculatetotal(priceB, itemB);
        double productC = calculatetotal(priceC, itemC);
        double subtotal = productA + productB + productC;

        Discountname discount = calculatediscount(itemA, itemB, itemC, subtotal, priceA, priceB, priceC);

        double giftwrap = (giftA ? itemA : 0) * giftwrapfee +
                (giftB ? itemB : 0) * giftwrapfee +
                (giftC ? itemC : 0) * giftwrapfee;

        int numpackages = (int) Math.ceil((double) (itemA + itemB + itemC) / packages);
        double shippingfee = numpackages * shipping;

        double total = subtotal - (discount.getDiscount() + giftwrap + shippingfee);

        System.out.println("Product A\t" + itemA + "\t$" + productA);
        System.out.println("Product B\t" + itemB + "\t$" + productB);
        System.out.println("Product C\t" + itemC + "\t$" + productC);
        System.out.println("Subtotal:\t$" + subtotal);
        System.out.println("Discount:\t" + discount.getName() + " " + discount.getDiscount());
        System.out.println("Gift Wrap:\t" + giftwrap);
        System.out.println("Shipping:\t$" + shippingfee);
        System.out.println("Total:\t\t$" + total);
    }

    static class Discountname {
        private double discount;
        private String name;

        public Discountname(double discount, String name) {
            this.discount = discount;
            this.name = name;
        }

        public double getDiscount() {
            return discount;
        }

        public String getName() {
            return name;
        }
    }
}
