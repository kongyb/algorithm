import java.util.Scanner;

public class BOJ15650 {

    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int M = sc.nextInt();

        boolean[] isVisited = new boolean[N];
        int[] arr = new int[M];
        recur(isVisited, arr, M);
        System.out.println(sb);
    }

    static void recur(boolean[] isVisited, int[] arr, int rest) {
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
        for (int i=start; i<= isVisited.length; i++) {
            if (isVisited[i-1]) {
                continue;
            }
            arr[index] = i;
            isVisited[i-1] = true;
            recur(isVisited, arr, rest - 1);
            isVisited[i-1] = false;
        }
    }

}
