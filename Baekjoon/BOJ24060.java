import java.util.Arrays;
import java.util.Scanner;

public class BOJ24060 {

    static int cnt = 0;
    static int result = -1;
    static int target = 0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int len = sc.nextInt();
        target = sc.nextInt();
        int[] arr = new int[len];
        for (int i=0; i<len; i++) {
            arr[i] = sc.nextInt();
        }
        mergeSort(arr, 0, arr.length - 1);
        System.out.println(result);
    }

    static void mergeSort(int[] arr, int start, int end) {
        if (start < end) {
            int mid = (start + end) / 2;
            mergeSort(arr, start, mid);
            mergeSort(arr, mid+1, end);
            merge(arr, start, mid, end);
        }
    }

    static void merge(int[] arr, int start, int mid, int end) {
        int i = start, j = mid+1, t = 0;
        int[] temp = Arrays.copyOf(arr, end - start + 1);
        while (i <= mid && j <= end) {
            if (arr[i] <= arr[j]) {
                temp[t] = arr[i];
                i++;
            }
            else {
                temp[t] = arr[j];
                j++;
            }
            t++;
        }
        while (i <= mid) {
            temp[t] = arr[i];
            t++;
            i++;
        }
        while (j <= end) {
            temp[t] = arr[j];
            t++;
            j++;
        }
        i = start;
        t = 0;
        while (i <= end) {
            arr[i] = temp[t];
            cnt++;
            if (cnt == target) {
                result = temp[t];
            }
            i++;
            t++;
        }
    }
}
