import java.util.Scanner;
import java.util.Stack;

public class PalindromeStrategyApp {

    interface PalindromeStrategy {
        boolean isPalindrome(String input);
    }

    static class TwoPointerStrategy implements PalindromeStrategy {
        public boolean isPalindrome(String input) {
            int start = 0;
            int end = input.length() - 1;

            while (start < end) {
                if (input.charAt(start) != input.charAt(end)) {
                    return false;
                }
                start++;
                end--;
            }
            return true;
        }
    }

    static class ReverseStringStrategy implements PalindromeStrategy {
        public boolean isPalindrome(String input) {
            String reversed = "";
            for (int i = input.length() - 1; i >= 0; i--) {
                reversed += input.charAt(i);
            }
            return input.equals(reversed);
        }
    }

    static class StackStrategy implements PalindromeStrategy {
        public boolean isPalindrome(String input) {
            Stack<Character> stack = new Stack<>();
            for (char c : input.toCharArray()) {
                stack.push(c);
            }

            for (char c : input.toCharArray()) {
                if (c != stack.pop()) {
                    return false;
                }
            }
            return true;
        }
    }

    static class PalindromeContext {
        private PalindromeStrategy strategy;

        public void setStrategy(PalindromeStrategy strategy) {
            this.strategy = strategy;
        }

        public boolean check(String input) {
            return strategy.isPalindrome(input);
        }
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        PalindromeContext context = new PalindromeContext();

        System.out.print("Enter a string: ");
        String input = scanner.nextLine();

        System.out.println("Choose Strategy:");
        System.out.println("1. Two Pointer");
        System.out.println("2. Reverse String");
        System.out.println("3. Stack Based");
        System.out.print("Enter choice: ");

        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                context.setStrategy(new TwoPointerStrategy());
                break;
            case 2:
                context.setStrategy(new ReverseStringStrategy());
                break;
            case 3:
                context.setStrategy(new StackStrategy());
                break;
            default:
                System.out.println("Invalid choice. Using default Two Pointer.");
                context.setStrategy(new TwoPointerStrategy());
        }

        boolean result = context.check(input);

        System.out.println("Input : " + input);
        System.out.println("Is Palindrome? : " + result);

        scanner.close();
    }
}