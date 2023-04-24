import java.util.Arrays;
import java.util.Scanner;

public class BOJ4779 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            int N = sc.nextInt();
            System.out.println(solution(N));
        }
    }

    static String solution(int N) {
        int len = (int)Math.pow(3,N);
        char[] arr = new char[len];
        Arrays.fill(arr,'-');
        change(arr, 0, len);
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<len; i++) {
            sb.append(arr[i]);
        }
        return sb.toString();
    }

    static void change(char[] arr, int start, int end) {
        if (end - start == 1) {
            return;
        }
        int diff = end - start;
        int mid1 = start + (diff / 3);
        int mid2 = end - (diff / 3);
        for (int i=mid1; i<mid2; i++) {
            arr[i] = ' ';
        }
        change(arr, start, mid1);
        change(arr, mid2, end);
        return;
    }
}
