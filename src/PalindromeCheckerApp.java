import java.util.Scanner;
public class PalindromeCheckerApp {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String original = scanner.nextLine();

        String reversed = "";

        for (int i = original.length() - 1; i >= 0; i--) {
            reversed = reversed + original.charAt(i);
        }

        boolean isPalindrome = original.equals(reversed);

        System.out.println("Input : " + original);
        System.out.println("Is Palindrome? : " + isPalindrome);

        scanner.close();
    }
}