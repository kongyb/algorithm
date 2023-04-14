import java.util.Scanner;

public class BOJ11866 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int K = sc.nextInt();
        DoubleLinkedList<Integer> list = new DoubleLinkedList();
        StringBuilder sb = new StringBuilder("<");
        for (int i=1; i<=N; i++) {
            list.addTail(i);
        }

        while (list.getLen() > 0) {
            for (int i=0; i<K-1; i++) {
                list.addTail(list.popHead());
            }
            sb.append(list.popHead());
            if (list.getLen() > 0) {
                sb.append(", ");
            }
        }
        sb.append(">");
        System.out.println(sb);
    }

    private static class DoubleLinkedList<T> {
        ListNode<T> head;
        ListNode<T> tail;
        int len;

        DoubleLinkedList() {
            this.head = null;
            this.tail = null;
            this.len = 0;
        }

        void addHead(T val) {
            ListNode<T> node = new ListNode(val);
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                this.len++;
                return;
            }
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            this.len++;
        }

        void addTail(T val) {
            ListNode<T> node = new ListNode(val);
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                this.len++;
                return;
            }
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
            this.len++;
        }

        T popHead() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.head;
            this.head = this.head.next;
            if (this.head == null) {
                this.tail = null;
            }
            else {
                this.head.prev = null;
            }
            this.len--;
            return node.val;
        }

        T popTail() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.tail;
            this.tail = this.tail.prev;
            if (this.tail == null) {
                this.head = null;
            }
            else {
                this.tail.next = null;
            }
            this.len--;
            return node.val;
        }

        int getLen() {
            return this.len;
        }

    }

    private static class ListNode<T> {
        T val;
        ListNode<T> prev;
        ListNode<T> next;

        ListNode(T val) {
            this.val = val;
            this.next = null;
            this.prev = null;
        }
    }

}
