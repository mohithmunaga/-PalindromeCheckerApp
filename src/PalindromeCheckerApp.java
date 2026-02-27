import java.util.Stack;

public class PalindromeCheckerApp {

    public static boolean twoPointer(String input) {
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

    public static boolean reverseString(String input) {
        String reversed = "";
        for (int i = input.length() - 1; i >= 0; i--) {
            reversed += input.charAt(i);
        }
        return input.equals(reversed);
    }

    public static boolean stackMethod(String input) {
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

    public static void main(String[] args) {

        String input = "racecar";

        long startTime, endTime;

        startTime = System.nanoTime();
        twoPointer(input);
        endTime = System.nanoTime();
        System.out.println("Two Pointer Time: " + (endTime - startTime) + " ns");

        startTime = System.nanoTime();
        reverseString(input);
        endTime = System.nanoTime();
        System.out.println("Reverse String Time: " + (endTime - startTime) + " ns");

        startTime = System.nanoTime();
        stackMethod(input);
        endTime = System.nanoTime();
        System.out.println("Stack Method Time: " + (endTime - startTime) + " ns");
    }
}