import java.util.Scanner;

public class BOJ15652 {

    static StringBuffer sb = new StringBuffer();
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int N = sc.nextInt();
        int M = sc.nextInt();

        int[] arr = new int[M];
        recur(arr, M, N);
        System.out.println(sb);
    }

    static void recur(int[] arr, int rest, int N) {
        if (rest == 0) {
            for (int num : arr) {
                sb.append(num);
                sb.append(" ");
            }
            sb.replace(sb.length() - 1, sb.length(), "\n");
            return;
        }
        int index = arr.length - rest;
        int start = index == 0 ? 1 : arr[index - 1];
        for (int i=start; i<= N; i++) {
            arr[index] = i;
            recur(arr, rest - 1, N);
        }
    }

}
