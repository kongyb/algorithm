import java.util.ArrayList;
import java.util.Scanner;

public class BOJ1541 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.next();

        System.out.println(solution(str));
    }

    static int solution(String str) {
        ArrayList<Integer> nums = new ArrayList<>();
        ArrayList<Character> ops = new ArrayList<>();

        StringBuilder sb = new StringBuilder();
        for (int i=0; i<str.length(); i++) {
            char c = str.charAt(i);
            if (c == '+' || c == '-') {
                nums.add(Integer.parseInt(sb.toString()));
                ops.add(c);
                sb = new StringBuilder();
            }
            else {
                sb.append(c);
            }
        }
        nums.add(Integer.parseInt(sb.toString()));

        boolean isAdd = true;
        int result = nums.get(0);
        for (int i=1; i<nums.size(); i++) {
            if (ops.get(i-1) == '-') {
                isAdd = false;
            }
            result += (isAdd ? 1 : -1) * nums.get(i);
        }
        return result;
    }
}
