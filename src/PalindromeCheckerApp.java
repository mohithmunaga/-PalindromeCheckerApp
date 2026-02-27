import java.util.Scanner;

public class PalindromeCheckerApp {

    static class PalindromeService {

        public boolean isPalindrome(String input) {

            if (input == null) {
                return false;
            }

            String cleaned = input.replaceAll("\\s+", "").toLowerCase();

            int start = 0;
            int end = cleaned.length() - 1;

            while (start < end) {
                if (cleaned.charAt(start) != cleaned.charAt(end)) {
                    return false;
                }
                start++;
                end--;
            }

            return true;
        }
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        PalindromeService service = new PalindromeService();

        System.out.print("Enter a string: ");
        String input = scanner.nextLine();

        boolean result = service.isPalindrome(input);

        System.out.println("Input : " + input);
        System.out.println("Is Palindrome? : " + result);

        scanner.close();
    }
}