import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

// 백준 - 트리
// https://www.acmicpc.net/problem/4256
public class BOJ4256 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int T = Integer.parseInt(st.nextToken());
        for (int testCase = 1; testCase <= T; testCase++) {
            st = new StringTokenizer(br.readLine());
            int nodeCnt = Integer.parseInt(st.nextToken());
            int[] preOrder = new int[nodeCnt];
            int[] inOrder = new int[nodeCnt];
            st = new StringTokenizer(br.readLine());
            StringTokenizer st1 = new StringTokenizer(br.readLine());
            for (int i=0; i < nodeCnt; i++) {
                preOrder[i] = Integer.parseInt(st.nextToken());
                inOrder[i] = Integer.parseInt(st1.nextToken());
            }
            System.out.println(solution(preOrder, inOrder));
        }
    }

    static String solution(int[] preOrder, int[] inOrder) {
        TreeNode root = makeTree(preOrder, inOrder);
        StringBuilder sb = new StringBuilder();
        postOrderString(root, sb);
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    static void postOrderString(TreeNode root, StringBuilder sb) {
        if (root.left != null) {
            postOrderString(root.left, sb);
        }
        if (root.right != null) {
            postOrderString(root.right, sb);
        }
        sb.append(root.val);
        sb.append(" ");
        return;
    }

    static TreeNode makeTree(int[] preOrder, int[] inOrder) {
        if (preOrder.length == 0) {
            return null;
        }
        int rootVal = preOrder[0];
        int len = preOrder.length;
        int index;
        for (index = 0; index < len; index++) {
            if (inOrder[index] == rootVal) {
                break;
            }
        }
        TreeNode result = new TreeNode(rootVal);
        TreeNode left = makeTree(Arrays.copyOfRange(preOrder, 1, 1+index),
                Arrays.copyOfRange(inOrder, 0, index));
        TreeNode right = makeTree(Arrays.copyOfRange(preOrder, 1+index, len),
                Arrays.copyOfRange(inOrder, index+1, len));
        result.setLeft(left);
        result.setRight(right);
        return result;
    }

    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }

        void setLeft(TreeNode left) {
            this.left = left;
        }

        void setRight(TreeNode right) {
            this.right = right;
        }
    }
}
